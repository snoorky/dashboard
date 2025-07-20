import { AdminGuard } from "@/context/authAdmin";

export default function Companies() {
	return (
		<AdminGuard>
			<div className="p-4">
				<h1 className="text-2xl font-bold">Empresas</h1>
				{/* resto do conteúdo */}
			</div>
		</AdminGuard>
	)
}