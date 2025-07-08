import LoginForm from "@/components/ui/login";
import Image from "next/image";

export default function Home() {
	return (
		<main
			className="min-h-svh min-w-svw bg-cover bg-no-repeat flex items-center justify-center"
			style={{ backgroundImage: "url('/background.svg')" }}
		>
			<div className="flex flex-col items-center space-y-4">
				<Image src="/logo.png" alt="logo da Beforce" width={125} height={66} priority />

				<div className="rounded-2xl backdrop-blur-sm border border-white/10 bg-white/3">
					<LoginForm />
				</div>
			</div>
		</main>
	);
}
