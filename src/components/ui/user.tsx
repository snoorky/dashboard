"use client";

import { useAuth } from "@/app/contexts/authContext";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";

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
			<button className="flex items-center gap-3 p-2" aria-label="Abrir menu do usuário"
				onClick={() => setShowUserDropdown(!showUserDropdown)}
			>
				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-primary to-red-5">
					<User2 className="w-5 h-5 text-white" />
				</div>
				<div className="text-left text-sm hidden lg:block">
					<p className="font-medium">{company?.business_name}</p>
				</div>
				<ChevronDown className={`${showUserDropdown ? "rotate-180" : ""} hidden lg:block`} />
			</button>

			{showUserDropdown && (
				<div className="absolute top-full xl:top-auto xl:bottom-full right-0 xl:right-auto xl:left-0 z-50 p-3 rounded-xl min-w-52 text-sm border border-[#e5e7eb] bg-white">
					<p className="lg:hidden font-medium">{company?.business_name}</p>
					<p className="font-light">{user?.email}</p>
					<button className="w-full mt-3 flex items-center gap-2 pt-3 border-t border-[#e5e7eb] text-primary"
						onClick={handleLogout}
					>
						<LogOut className="w-4 h-4" />
						<span className="font-medium">Sair</span>
					</button>
				</div>
			)}
		</div>
	);
}
