"use client"

import { LayoutDashboard, Headphones, Globe2, Users, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type NavItemProps = {
	icon: ReactNode;
	name: string;
	url: string;
}

const navigation: NavItemProps[] = [
	{ icon: <LayoutDashboard className="w-4.5 h-4.5" />, name: "Dashboard", url: "/dashboard" },
	{ icon: <Headphones className="w-4.5 h-4.5" />, name: "Atendimento", url: "/dashboard/report" },
	{ icon: <Globe2 className="w-4.5 h-4.5" />, name: "Website", url: "/dashboard/website" },
	{ icon: <Users className="w-4.5 h-4.5" />, name: "Equipe", url: "/dashboard/team" },
];

export function NavBar() {
	const pathname = usePathname();
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const shouldShowFilter = ["/dashboard", "/dashboard/report", "/dashboard/website"].includes(pathname);
	const shouldShowSearch = pathname === "/dashboard/team";

	return (
		<>
			<aside className="xl:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
				<div className="flex items-center justify-between p-1 rounded-full shadow-sm border border-surface bg-light">
					{navigation.map((item, index) => {
						const isActive = pathname === item.url

						return (
							<Link key={index} href={item.url} className={`relative z-10 flex items-center gap-2 py-2 px-3 rounded-full font-medium ${isActive ? "bg-accent text-light" : ""}`}>
								{item.icon}
								<span className={!isActive ? "sr-only" : ""}>{item.name}</span>
							</Link>
						)
					})}
				</div>
				{shouldShowFilter && (
					<button onClick={() => setIsFilterOpen(true)} className="py-3 px-3 rounded-full shadow-sm border border-surface bg-accent text-light">
						<SlidersHorizontal className="w-4.5 h-4.5" aria-label="Filtrar" />
					</button>
				)}

				{shouldShowSearch && (
					<button onClick={() => setIsSearchOpen(true)} className="py-3 px-3 rounded-full shadow-sm border border-surface bg-accent text-light">
						<Search className="w-4.5 h-4.5" aria-label="Buscar" />
					</button>
				)}
			</aside>

			{isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
			{isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
		</>
	)
}

function FilterModal({ onClose }: { onClose: () => void }) {
	return (
		<div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-md z-50">
			{/* Seus selects vão aqui */}
			<div className="flex gap-2">
				<select className="border rounded p-2">
					<option>Atendente</option>
				</select>
				<select className="border rounded p-2">
					<option>Período</option>
				</select>
			</div>
			<button onClick={onClose} className="mt-2 text-sm text-blue-600">Fechar</button>
		</div>
	)
}

function SearchBar({ onClose }: { onClose: () => void }) {
	return (
		<div className="fixed bottom-6 left-4 right-4 p-2 bg-white border rounded-full shadow-lg z-50 flex items-center">
			<input
				autoFocus
				type="text"
				placeholder="Buscar na equipe..."
				className="flex-1 px-4 py-2 rounded-full outline-none"
			/>
			<button onClick={onClose} className="ml-2 text-sm text-blue-600">Cancelar</button>
		</div>
	)
}