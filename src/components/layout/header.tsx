"use client"

import { useAuth } from "@/context/authContext"
import { useLayout } from "@/context/layoutContext"
import supabase from "@/utils/supabase"
import { ChartNoAxesCombined, ChevronDown, LogOut, User2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Header() {
	const { user, company } = useAuth()
	const { pageTitle } = useLayout()
	const router = useRouter()

	const [showUserDropdown, setShowUserDropdown] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	async function handleLogout() {
		await supabase.auth.signOut()
		router.push("/")
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setShowUserDropdown(false)
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => { document.removeEventListener("mousedown", handleClickOutside) }
	}, [])

	return (
		<header className="flex items-center p-4 border-b border-surface bg-light">
			<div className="w-56">
				<div className="relative w-[95px] h-[43px]">
					<Image
						src="/logo-dark.png"
						alt="logo da Beforce"
						className="absolute"
						sizes="(max-width: 768px) 95px, 95px"
						fill
						priority
					/>
				</div>
			</div>

			<div className="hidden xl:block">
				<div className="flex items-center gap-2 mb-1">
					<ChartNoAxesCombined className="w-6 h-6 text-accent" />
					<h1 className="text-xl font-bold">{pageTitle}</h1>
				</div>
				<p className="text-sm">Acompanhe as métricas de atendimento</p>
			</div>

			<div className="ml-auto relative" ref={dropdownRef}>
				<button className="flex items-center gap-2 p-2" aria-label="Abrir menu do usuário" onClick={() => setShowUserDropdown((prev) => !prev)}>
					<div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
						<User2 className="w-5 h-5 text-light" />
					</div>
					<div className="hidden lg:block text-left text-sm">
						<p className="font-medium">{company?.business_name}</p>
					</div>
					<ChevronDown className={showUserDropdown ? "rotate-180" : ""} />
				</button>

				{showUserDropdown && (
					<div className="absolute top-full right-0 z-50 p-3 rounded-xl min-w-52 text-sm border border-surface bg-light">
						<p className="lg:hidden font-medium">{company?.business_name}</p>
						<p className="font-light">{user?.email || "Bem-vindo..."}</p>
						<button className="w-full mt-3 flex items-center gap-2 pt-3 border-t border-surface text-accent" onClick={handleLogout} aria-label="Sair">
							<LogOut className="w-4 h-4" />
							<span className="font-medium">Sair</span>
						</button>
					</div>
				)}
			</div>
		</header>
	)
}