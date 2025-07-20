import UsersDesktopTable from "@/components/users/desktopTable"
import UsersMobileList from "@/components/users/mobileList"
import { UserBase } from "@/types/user"
import supabaseAdmin from "@/supabase/admin"
import { UserCog, UserPlus } from "lucide-react"
import { getUserStatus } from "@/utils/userStatus"

export const dynamic = "force-dynamic"

export default async function Users() {
	const { data, error } = await supabaseAdmin.auth.admin.listUsers()
	if (error) throw new Error("Erro ao buscar usuários")
	const users = data.users as UserBase[]

	const usersWithStatus = users.map(user => ({
		...user,
		status: getUserStatus(user),
	}))

	return (
		<div className="py-8 space-y-4">
			<div className="flex xl:hidden items-center gap-2 mb-1 md">
				<UserCog className="w-6 h-6 text-accent" />
				<h1 className="text-2xl font-bold">Usuários</h1>
			</div>
			<p className="text-sm xl:hidden">Acompanhe as métricas de atendimento</p>
			<button className="hidden xl:flex text-sm font-medium justify-center items-center place-self-end p-3 rounded-lg gap-2 bg-accent text-light">
				<UserPlus className="w-5 h-5" />
				Adicionar Usuário
			</button>

			<UsersMobileList users={usersWithStatus} />
			<UsersDesktopTable users={usersWithStatus} />
		</div>
	)
}