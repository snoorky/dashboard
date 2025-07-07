"use client";

import supabase from "@/utils/supabase";
import { AuthContextType, Company } from "@/utils/types";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [company, setCompany] = useState<Company | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			const currentUser = session?.user ?? null;

			if (!isMounted) return;

			setUser(currentUser);

			if (!currentUser) {
				setCompany(null);
				setLoading(false);
				return;
			}

			const domain = currentUser.email?.split("@")[1];

			supabase
				.from("users")
				.select("*")
				.eq("domain", domain)
				.single()
				.then(({ data, error }) => {
					if (!isMounted) return;
					if (error || !data) setCompany(null);
					else setCompany(data as Company);
					setLoading(false);
				});
		});

		supabase.auth.getSession().then(({ data }) => {
			const currentUser = data.session?.user ?? null;
			if (!isMounted) return;
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ company, user, loading, supabase }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
	return context;
}
