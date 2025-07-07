import { Globe2, Home, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "./ui/user";

const navigation = [
  { icon: <Home className="w-5 h-5" />, name: "Home", url: "/dashboard" },
  { icon: <LayoutDashboard className="w-5 h-5" />, name: "Digisac", url: "/dashboard/digisac" },
  { icon: <Globe2 className="w-5 h-5" />, name: "Website", url: "/dashboard/" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="max-xl:hidden fixed inset-0 flex flex-col z-50 px-4 max-w-44 min-h-screen border-r border-[#e5e7eb]">
      <Image src="/logo-dark.png" alt="Beforce" width={125} height={66} priority />
      <nav className="flex-1 space-y-2 mt-8">
        {navigation.map((route, index) => {
          const isActive = pathname === route.url;

          return (
            <Link key={index} href={route.url}
              className={`flex items-center gap-2 p-2 rounded-xl backdrop-blur-[2px]
						${isActive ? "px-3 bg-linear-to-r from-primary to-red-5 text-white" : "border border-transparent"}
						`}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto mb-4">
        <User />
      </div>
    </aside>
  );
}
