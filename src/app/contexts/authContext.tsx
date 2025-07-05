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

type AuthProviderProps = {
	children: ReactNode;
	initialUser?: User | null;
	initialCompany?: Company | null;
};

export function AuthProvider({
	children,
	initialUser = null,
	initialCompany = null,
}: AuthProviderProps) {
	console.log("[AuthProvider] initialUser:", initialUser);
	console.log("[AuthProvider] initialCompany:", initialCompany);

	const supabase = createClient();

	const [user, setUser] = useState<User | null>(initialUser);
	const [company, setCompany] = useState<Company | null>(initialCompany);
	const [loading, setLoading] = useState(!initialUser);

	useEffect(() => {
		if (initialUser) {
			console.log("[AuthProvider] Já temos usuário inicial, não busca.");
			return;
		}

		let isMounted = true;

		const fetchSessionAndCompany = async () => {
			console.log("[AuthProvider] Buscando sessão e empresa...");

			const { data: sessionData } = await supabase.auth.getSession();
			const currentUser = sessionData.session?.user;
			console.log("[AuthProvider] Sessão obtida:", currentUser?.email);

			if (!currentUser) {
				if (isMounted) {
					setUser(null);
					setCompany(null);
					setLoading(false);
					console.log("[AuthProvider] Usuário não encontrado na sessão.");
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

			if (error || !companyData) {
				setCompany(null);
				console.log("[AuthProvider] Erro ou empresa não encontrada:", error);
			} else {
				setCompany(companyData as Company);
				console.log("[AuthProvider] Empresa carregada:", companyData);
			}

			setLoading(false);
		};

		fetchSessionAndCompany();

		return () => {
			isMounted = false;
		};
	}, [initialUser, supabase]);

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
