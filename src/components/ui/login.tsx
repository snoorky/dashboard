"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        router.push("/dashboard");
      } else {
        setTimeout(() => router.push("/dashboard"), 200);
      }
    } catch {
      setError("Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-w-80 md:w-md lg:w-lg rounded-2xl p-8 text-white space-y-4"
    >
      <Input
        id="email"
        label="E-mail"
        placeholder="seu@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        id="password"
        label="Senha"
        placeholder="••••••••"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autocomplete="current-password"
        required
      />

      {error && <p className="text-sm text-red-12">{error}</p>}

      <Button label="Entrar" type="submit" isLoading={isLoading} loadingText="Entrando..." />
    </form>
  );
}
