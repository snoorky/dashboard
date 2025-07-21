"use client"

import { AuthContextType, Company } from "@/types/auth"
import supabase from "@/supabase/client"
import { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [company, setCompany] = useState<Company | null>(null)
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		async function loadSession() {
			const { data } = await supabase.auth.getSession()
			const currentUser = data.session?.user ?? null

			if (!isMounted) return

			setUser(currentUser)

			if (currentUser) {
				await loadCompany(currentUser)
				setIsAdmin(currentUser.email?.endsWith("@beforce.com.br") ?? false)
			} else {
				setCompany(null)
				setIsAdmin(false)
			}

			setLoading(false)
		}

		async function loadCompany(currentUser: User) {
			const domain = currentUser.email?.split("@")[1]
			if (!domain) return

			const { data, error } = await supabase.from("users").select("*").eq("domain", domain).single()

			if (!isMounted) return

			if (error || !data) setCompany(null)
			else setCompany(data as Company)
		}

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			const currentUser = session?.user ?? null
			setUser(currentUser)

			if (currentUser) {
				loadCompany(currentUser)
				setIsAdmin(currentUser.email?.endsWith("@beforce.com.br") ?? false)
			} else {
				setCompany(null)
				setIsAdmin(false)
			}
		})

		loadSession()

		return () => {
			isMounted = false
			subscription.unsubscribe()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ supabase, user, company, isAdmin, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider")
	return context
}