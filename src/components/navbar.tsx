import { Globe2, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{ icon: <Home className="w-6 h-6" />, name: "Home", url: "/dashboard" },
	{ icon: <LayoutDashboard className="w-6 h-6" />, name: "Digisac", url: "/dashboard/digisac" },
	{ icon: <Globe2 className="w-6 h-6" />, name: "Website", url: "/dashboard/" },
];

export function Navbar() {
	const pathname = usePathname();

	return (
		<div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-center gap-4">
			{navigation.map((route, index) => {
				const isActive = pathname === route.url;

				return (
					<Link key={index} href={route.url}
						className={`flex items-center gap-2 p-2 rounded-xl backdrop-blur-[2px]
						${isActive ? "px-3 bg-primary text-white" : "border border-gray-700 bg-gray-800"}
						`}
					>
						{route.icon}
						{isActive ? (
							<span>{route.name}</span>
						) : (
							<span className="sr-only">{route.name}</span>
						)}
					</Link>
				);
			})}
		</div>
	);
}
