import Image from "next/image";
import { User } from "./ui/user";
import { LogoBeforce } from "./ui/logo";

export default function Header() {
	return (
		<header className="xl:hidden flex items-center justify-between px-4 py-3 border-b border-surface bg-light">
			<LogoBeforce isDark />
			<User />
		</header>
	);
}
