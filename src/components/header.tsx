"use client"

import { LogoBeforce } from "./ui/logo";
import { ChartNoAxesCombined, ChevronDown, LogOut, User2 } from "lucide-react";
import { useAuth } from "@/utils/authContext";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import supabase from "@/utils/supabase";

const pageTitle: { [key: string]: string } = {
	dashboard: "Dashboard",
	report: "Atendimento",
	website: "Website",
	team: "Equipe",
	companies: "Empresas",
	users: "Usuários",
}

export default function Header() {
	const { user, company } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const [showUserDropdown, setShowUserDropdown] = useState(false);

	async function handleLogout() {
		await supabase.auth.signOut();
		router.push("/");
	}

	function getPageTitle(pathname: string): string {
		const key = pathname.split("/").pop();
		if (key && key in pageTitle) return pageTitle[key as keyof typeof pageTitle];
		return "Dashboard";
	}

	return (
		<header className="flex items-center p-4 border-b border-surface bg-light">
			<div className="w-56">
				<LogoBeforce isDark />
			</div>

			<div className="hidden xl:block">
				<div className="flex items-center gap-2 mb-1">
					<ChartNoAxesCombined className="w-6 h-6 text-accent" />
					<h1 className="text-xl font-bold">{getPageTitle(pathname)}</h1>
				</div>
				<p className="text-sm">Acompanhe as métricas de atendimento</p>
			</div>

			<div className="ml-auto relative">
				<button className="flex items-center gap-2 p-2" aria-label="Abrir menu do usuário" onClick={() => setShowUserDropdown(!showUserDropdown)}>
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
						<button className="w-full mt-3 flex items-center gap-2 pt-3 border-t border-surface text-accent" onClick={handleLogout}>
							<LogOut className="w-4 h-4" />
							<span className="font-medium">Sair</span>
						</button>
					</div>
				)}

			</div>
		</header>
	);
}
