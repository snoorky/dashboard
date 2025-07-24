import { useLayout } from "@/context/layoutContext"
import Image from "next/image"
import UserMenu from "../user"

export default function Header() {
	// const { pageTitle } = useLayout()

	return (
		<header className="flex items-center p-4 border-b border-surface bg-light">
			<div className="w-56">
				<Image
					src="/logo-dark.png"
					alt="Beforce"
					width={95}
					height={43}
					sizes="(max-width: 768px) 95px, 95px"
					priority
				/>
			</div>

			{/* <div className="hidden xl:block">
				<div className="flex items-center gap-2 mb-1">
					<ChartNoAxesCombined className="w-6 h-6 text-accent" />
					<h1 className="text-xl font-bold">{pageTitle}</h1>
				</div>
				<p className="text-sm">Acompanhe as métricas de atendimento</p>
			</div> */}

			<div className="ml-auto">
				<UserMenu />
			</div>
		</header>
	)
}