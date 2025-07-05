"use client";

import { Globe2, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{
		icon: <Home className="w-5 h-5" />,
		name: "Home",
		url: "/dashboard",
	},
	{
		icon: <LayoutDashboard className="w-5 h-5" />,
		name: "Digisac",
		url: "/dashboard/digisac",
	},
	{
		icon: <Globe2 className="w-5 h-5" />,
		name: "Website",
		url: "/dashboard/",
	},
];

export function Navbar() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center gap-4 backdrop-blur-xl">
			{items.map((item, index) => {
				const isActive = pathname === item.url;
				return (
					<Link
						key={index}
						href={item.url}
						className={`flex items-center gap-2 text-sm p-2 rounded-xl
							${isActive ? "px-3 bg-linear-to-r from-primary to-red-5 text-white" : "border border-[#e5e7eb]"}
						`}
					>
						{item.icon}
						{isActive && <span>{item.name}</span>}
					</Link>
				);
			})}
		</div>
	);
}
