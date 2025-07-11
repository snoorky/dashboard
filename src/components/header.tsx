import Image from "next/image";
import { User } from "./ui/user";

export default function Header() {
	return (
		<header className="xl:hidden flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800">
			<Image src="/logo.png" alt="Beforce" width={125} height={66} priority />
			<User />
		</header>
	);
}
