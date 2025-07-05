"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const login = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!login.ok) {
				setError("Erro ao fazer login");
				setIsLoading(false);
				return;
			}

			window.location.href = "/dashboard";
		} catch {
			setError("Erro inesperado.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		// <div className="w-screen h-screen bg-red-400 md:bg-blue-300 lg:bg-green-300 xl:bg-orange-400 2xl:bg-pink-300"></div>
		<main
			className="min-h-svh min-w-svw bg-cover bg-no-repeat flex items-center justify-center"
			style={{ backgroundImage: "url('/background.svg')" }}
		>
			<div className="flex flex-col items-center space-y-4">
				<div className="relative w-[125px] md:w-[175px] lg:w-[200px] h-[66px] md:h-[93px] lg:h-[106px]">
					<Image
						src="/logo.png"
						className="absolute"
						alt="logo da Beforce"
						sizes="(min-width: 1024px) 200px, (min-width: 768px) 175px, 125px"
						fill
						priority
					/>
				</div>
				<div className="rounded-2xl backdrop-blur-sm border border-white/10 bg-white/3">
					<form
						className="relative min-w-80 md:w-md lg:w-lg rounded-2xl p-8 text-white space-y-4"
						onSubmit={handleSubmit}
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
