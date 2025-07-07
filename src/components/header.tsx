import Image from "next/image";
import { User } from "./ui/user";

export default function Header() {
	return (
		<header className="xl:hidden flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb]">
			<Image src="/logo-dark.png" alt="Beforce" width={125} height={66} priority />
			<User />
		</header>
	);
}
