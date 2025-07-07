"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const supabase = createClient();

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

			const { data: userData } = await supabase.auth.getUser();
			if (userData?.user) router.push("/dashboard");
		} catch {
			setError("Erro inesperado.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main
			className="min-h-svh min-w-svw bg-cover bg-no-repeat flex items-center justify-center"
			style={{ backgroundImage: "url('/background.svg')" }}
		>
			<div className="flex flex-col items-center space-y-4">
				<Image src="/logo.png" alt="logo da Beforce" width={125} height={66} priority />

				<div className="rounded-2xl backdrop-blur-sm border border-white/10 bg-white/3">
					<form onSubmit={handleSubmit} className="relative min-w-80 md:w-md lg:w-lg rounded-2xl p-8 text-white space-y-4">
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
							required
						/>

						{error && <p className="text-sm text-red-12">{error}</p>}

						<Button label="Entrar" type="submit" isLoading={isLoading} loadingText="Entrando..." />
					</form>
				</div>
			</div>
		</main>
	);
}
