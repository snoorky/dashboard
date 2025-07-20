"use client"

import { useAuth } from "@/context/authContext"
import { Building2, Globe2, Headphones, LayoutDashboard, Search, SlidersHorizontal, UserCog, UserPlus, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FilterModal } from "../report/filterModal"
import { SearchModal } from "../report/searchModal"
import { CreateUserModal } from "../users/userModal"

type NavItemProps = {
	icon: React.ReactNode
	name: string
	url: string
}

const navigation: NavItemProps[] = [
	{ icon: <LayoutDashboard className="w-4.5 h-4.5" />, name: "Painel", url: "/dashboard" },
	{ icon: <Headphones className="w-4.5 h-4.5" />, name: "Digisac", url: "/dashboard/report" },
	{ icon: <Globe2 className="w-4.5 h-4.5" />, name: "Website", url: "/dashboard/website" },
	{ icon: <Users className="w-4.5 h-4.5" />, name: "Equipe", url: "/dashboard/team" },
]

const adminNavigation: NavItemProps[] = [
	{ icon: <Building2 className="w-4.5 h-4.5" />, name: "Empresas", url: "/dashboard/companies" },
	{ icon: <UserCog className="w-4.5 h-4.5" />, name: "Usuários", url: "/dashboard/users" },
]

export function NavBar() {
	const pathname = usePathname()
	const { isAdmin } = useAuth()

	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isUsersOpen, setIsUsersOpen] = useState(false)

	const shouldShowFilter = ["/dashboard", "/dashboard/report", "/dashboard/website"].includes(pathname)
	const shouldShowSearch = ["/dashboard/team", "/dashboard/companies"].includes(pathname)
	const shouldShowAddUser = ["/dashboard/users"].includes(pathname)

	return (
		<>
			<aside className="xl:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-1 text-sm">
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
					{isAdmin && (
						<>
							{adminNavigation.map((item, index) => {
								const isActive = pathname === item.url

								return (
									<Link key={index} href={item.url} className={`relative z-10 flex items-center gap-2 py-2 px-3 rounded-full font-medium ${isActive ? "bg-accent text-light" : ""}`}>
										{item.icon}
										<span className={!isActive ? "sr-only" : ""}>{item.name}</span>
									</Link>
								)
							})}
						</>
					)}
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

				{shouldShowAddUser && (
					<button onClick={() => setIsUsersOpen(true)} className="py-3 px-3 rounded-full shadow-sm border border-surface bg-accent text-light">
						<UserPlus className="w-4.5 h-4.5" aria-label="Adicionar usuário" />
					</button>
				)}
			</aside>

			{isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
			{isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
			{isUsersOpen && <CreateUserModal onClose={() => setIsUsersOpen(false)} />}
		</>
	)
}