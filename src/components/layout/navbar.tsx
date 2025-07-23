"use client"

import { useAuth } from "@/context/authContext"
import { Search, SlidersHorizontal, UserPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FilterModal } from "../report/filterModal"
import { SearchModal } from "../report/searchModal"
import { CreateUserModal } from "../users/userModal"
import { mobileNavigation, adminNavigation } from "../navigation/navigationConfig"
import { NavigationList } from "../navigation/navigationList"
import { NavActionButton } from "../navigation/navActionButton"

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
					<NavigationList items={mobileNavigation} variant="mobile" />
					{isAdmin && (<NavigationList items={adminNavigation} variant="mobile" />)}
				</div>

				<NavActionButton
					icon={<SlidersHorizontal className="w-4.5 h-4.5" />}
					condition={shouldShowFilter}
					onClick={() => setIsFilterOpen(true)}
					ariaLabel="Filtrar"
				/>

				<NavActionButton
					icon={<Search className="w-4.5 h-4.5" />}
					condition={shouldShowSearch}
					onClick={() => setIsSearchOpen(true)}
					ariaLabel="Buscar"
				/>

				<NavActionButton
					icon={<UserPlus className="w-4.5 h-4.5" />}
					condition={shouldShowAddUser}
					onClick={() => setIsUsersOpen(true)}
					ariaLabel="Adicionar usuário"
				/>
			</aside>

			{isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
			{isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
			{isUsersOpen && <CreateUserModal onClose={() => setIsUsersOpen(false)} />}
		</>
	)
}