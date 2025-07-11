"use client";

import { useAuth } from "@/utils/authContext";
import supabase from "@/utils/supabase";
import { User2, ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function User() {
	const { user, company } = useAuth();
	const [showUserDropdown, setShowUserDropdown] = useState(false);
	const router = useRouter();

	async function handleLogout() {
		await supabase.auth.signOut();
		router.push("/");
	}

	return (
		<div className="relative">
			<button className="flex items-center gap-3 p-2" aria-label="Abrir menu do usuário" onClick={() => setShowUserDropdown(!showUserDropdown)}>
				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-accent to-accent-dark">
					<User2 className="w-5 h-5 text-light" />
				</div>
				<div className="hidden lg:block text-left text-sm">
					<p className="font-medium">{company?.business_name}</p>
				</div>
				<ChevronDown className={showUserDropdown ? "rotate-180" : ""} />
			</button>

			{showUserDropdown && (
				<div className="absolute top-full xl:top-auto xl:bottom-full right-0 xl:right-auto xl:left-0 z-50 p-3 rounded-xl min-w-52 text-sm border border-surface bg-light">
					<p className="lg:hidden font-medium">{company?.business_name}</p>
					<p className="font-light">{user?.email || "Bem-vindo..."}</p>
					<button className="w-full mt-3 flex items-center gap-2 pt-3 border-t border-surface text-accent" onClick={handleLogout}>
						<LogOut className="w-4 h-4" />
						<span className="font-medium">Sair</span>
					</button>
				</div>
			)}
		</div>
	);
}
