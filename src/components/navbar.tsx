"use client"

import { Globe2, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoBeforce } from "./ui/logo";
import { User } from "./ui/user";
import { ReactNode } from "react";
import { useMediaQuery } from "@/utils/useMediaQuery";

type NavItemProps = {
	icon: ReactNode;
	name: string;
	url: string;
}

type NavLinkProps = {
	route: NavItemProps;
	isActive: boolean;
	isMobile?: boolean;
}

const navigation: NavItemProps[] = [
	{ icon: <Home className="w-6 h-6" />, name: "Home", url: "/dashboard" },
	{ icon: <LayoutDashboard className="w-6 h-6" />, name: "Digisac", url: "/dashboard/digisac" },
	{ icon: <Globe2 className="w-6 h-6" />, name: "Website", url: "/dashboard/" },
];

export function Navbar() {
	const pathname = usePathname();
	const isMobile = useMediaQuery("(max-width: 80rem)");

	if (isMobile) {
		return (
			<aside className="xl:hidden fixed bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-center gap-4">
				{navigation.map((route, index) => (
					<NavLink key={index} route={route} isActive={pathname === route.url} isMobile />
				))}
			</aside>
		)
	}

	return (
		<aside className="max-xl:hidden fixed inset-0 flex flex-col z-50 px-4 pt-2 max-w-44 min-h-screen border-r border-surface bg-white">
			<div className="pb-4 border-b border-surface">
				<LogoBeforce isDark />
			</div>
			<nav className="flex-1 space-y-2 mt-8">
				{navigation.map((route, index) => (
					<NavLink key={index} route={route} isActive={pathname === route.url} />
				))}
			</nav>
			<div className="mt-auto mb-4">
				<User />
			</div>
		</aside>
	);
}

function NavLink({ route, isActive, isMobile }: NavLinkProps) {
	return (
		<Link href={route.url} className={`flex items-center gap-2 p-2 rounded-xl
			${isActive
				? "px-3 bg-linear-to-r from-accent to-accent-dark text-light"
				: isMobile
					? "border border-surface bg-light/50 lg:border-transparent hover:bg-accent/10"
					: "border border-transparent hover:bg-accent/5"}
			`}
		>
			{route.icon}
			<span className={isMobile && !isActive ? "max-xl:sr-only" : ""}>{route.name}</span>
		</Link>
	);
}