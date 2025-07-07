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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setCompany(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
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
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}
