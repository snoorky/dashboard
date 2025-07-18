import LoginForm from "@/components/ui/login";
import { LogoBeforce } from "@/components/ui/logo";

export default function Home() {
	return (
		<main className="min-h-svh min-w-svw bg-cover bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/background.svg')" }}>
			<div className="flex flex-col items-center space-y-4">
				<LogoBeforce />

				<div className="rounded-2xl backdrop-blur-xl border border-surface/10 bg-light/5">
					<h1 className="sr-only">Acesse sua conta!</h1>
					<LoginForm />
				</div>
			</div>
		</main>
	);
}
