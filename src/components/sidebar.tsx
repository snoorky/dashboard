import { Globe2, Home, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{
		icon: <Home className="w-6 h-6" />,
		name: "Home",
		url: "/dashboard",
	},
	{
		icon: <LayoutDashboard className="w-6 h-6" />,
		name: "Digisac",
		url: "/dashboard/digisac",
	},
	{
		icon: <Globe2 className="w-6 h-6" />,
		name: "Website",
		url: "/dashboard/website",
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="max-xl:hidden fixed top-0 left-0 z-50 h-screen w-48 p-4 shadow-sm border-r border-primary bg-dark-2">
			<Image src="/logo.png" alt="logo da Beforce" width={125} height={66} sizes="125px" priority />

			<nav className="flex flex-col gap-2 mt-8">
				{/* <nav className="px-6 space-y-2 flex-1"> */}
				{items.map((item, index) => {
					const isActive = pathname === item.url;
					return (
						<Link
							href={item.url}
							key={index}
							className={`flex items-center gap-2 text-base p-2 rounded-xl ${
								isActive && "bg-linear-to-r from-primary to-red-5"
							}`}
						>
							{item.icon}
							<span className="">{item.name}</span>
						</Link>
					);
				})}
			</nav>

			{/* User section */}
			{/* <div className="p-6 border-t border-gray-100 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowUserDropdown(!showUserDropdown);
            }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FA0D1D] to-[#962621] flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                  fill="currentColor"
                />
                <path
                  d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </button> */}

			{/* User Dropdown */}
			{/* {showUserDropdown && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-500"
                >
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          )} */}
			{/* </div> */}
		</div>
		// </div>
	);
}
