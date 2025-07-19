"use client"

import { LoginForm } from "@/components/ui/loginForm"
import Image from "next/image"

export default function Home() {
	return (
		<main className="min-h-svh min-w-svw bg-cover bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/background.svg')" }}>
			<div className="flex flex-col items-center space-y-4">
				<div className="relative w-[125px] h-[66px]">
					<Image
						src="/logo.png"
						className="absolute"
						sizes="(max-width: 768px) 125px, 125px"
						alt="logo da Beforce"
						fill
						priority
					/>
				</div>

				<div className="rounded-2xl backdrop-blur-xl border border-surface/10 bg-light/5">
					<h1 className="sr-only">Acesse sua conta!</h1>
					<LoginForm />
				</div>
			</div>
		</main>
	)
}