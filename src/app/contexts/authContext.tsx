// app/context/AuthProvider.tsx
"use client";

import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Company = {
	id: string;
	business_name: string;
	domain: string;
	url: string;
	token: string;
	created_at: string;
};

type AuthContextType = {
	company: Company | null;
	loading: boolean;
	supabase: SupabaseClient;
	user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const supabase = createClient();

	const [company, setCompany] = useState<Company | null>(null);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchSessionAndCompany = async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			const currentUser = sessionData.session?.user;

			if (!currentUser) {
				if (isMounted) {
					setUser(null);
					setCompany(null);
					setLoading(false);
				}

				return;
			}

			if (isMounted) setUser(currentUser);

			const domain = currentUser.email?.split("@")[1];

			const { data: companyData, error } = await supabase
				.from("users")
				.select("*")
				.eq("domain", domain)
				.single();

			if (!isMounted) return;

			if (error || !companyData) setCompany(null);
			else setCompany(companyData as Company);

			setLoading(false);
		};

		fetchSessionAndCompany();

		return () => {
			isMounted = false;
		};
	}, [supabase]);

	return (
		<AuthContext.Provider value={{ company, user, loading, supabase }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth falhando dentro do AuthProvider");
	return context;
}
