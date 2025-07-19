"use client"

import supabase from "@/utils/supabase"
import { SupabaseClient, User } from "@supabase/supabase-js"
import { useState, useEffect, useContext, createContext } from "react"

type Company = {
	id: string
	business_name: string
	domain: string
	url: string
	token: string
	created_at: string
}

type AuthContextType = {
	supabase: SupabaseClient
	user: User | null
	company: Company | null
	loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [company, setCompany] = useState<Company | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		async function loadSession() {
			const { data } = await supabase.auth.getSession()
			const currentUser = data.session?.user ?? null

			if (!isMounted) return
			setUser(currentUser)

			if (currentUser) await loadCompany(currentUser)
			else setCompany(null)

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
			if (currentUser) loadCompany(currentUser)
			else setCompany(null)
		})

		loadSession()

		return () => {
			isMounted = false
			subscription.unsubscribe()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ supabase, user, company, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider")
	return context
}