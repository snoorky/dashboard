"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) router.replace("/dashboard");
    };

    checkSession();
  }, [router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError("Erro ao fazer login");
        setIsLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) router.push("/dashboard");
      else setTimeout(() => router.push("/dashboard"), 200);
    } catch {
      setError("Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative min-w-80 md:w-md lg:w-lg rounded-2xl p-8 text-light space-y-4">
      <label htmlFor="email" className="block font-medium mb-1">Email</label>
      <input
        id="email"
        type="email"
        placeholder="seu@email.com"
        className="w-full p-3 rounded-lg outline-none border border-light/25 bg-gray-800 focus:border-accent"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="username"
        required
      />
      <label htmlFor="password" className="block font-medium mb-1">Senha</label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        className="w-full p-3 rounded-lg outline-none border border-light/25 bg-gray-800 focus:border-accent"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="current-password"
        required
      />

      {error && <p className="text-sm text-accent">{error}</p>}

      <Button
        label="Entrar"
        type="submit"
        isLoading={isLoading}
        loadingText="Entrando..."
      />
    </form>
  );
}
