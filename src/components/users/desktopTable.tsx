import { UserWithStatus } from "@/types/user"
import { UserRoundCheck, UserRound, UserRoundX, UserRoundPen, KeyRound, ShieldBan, ShieldCheck, MailCheck, Trash2 } from "lucide-react"
import { ActionButton } from "../ui/actionAPI"
import { getStatusStyle } from "@/utils/userStatus"

export default function UsersDesktopTable({ users }: { users: UserWithStatus[] }) {
  return (
    <div className="hidden md:block w-full overflow-auto relative rounded-xl border border-surface bg-light">
      <table className="min-w-max w-full">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr className="bg-dark/6">
            <th className="px-3 py-3 text-sm font-medium text-left">Email</th>
            <th className="px-3 py-3 text-sm font-medium text-center">Status</th>
            <th className="px-3 py-3 text-sm font-medium text-center">Criado em</th>
            <th className="px-3 py-3 text-sm font-medium text-center">Último login</th>
            <th className="px-3 py-3 text-sm font-medium text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const statusStyle = getStatusStyle(user.status)

            return (
              <tr key={user.id} className="border-b last:border-none border-surface even:bg-dark/6">
                <td className="px-3 py-3 text-sm flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${statusStyle}`}>
                    {user.status == "Ativo" && <UserRoundCheck className="w-5 h-5" />}
                    {user.status == "A Confirmar" && <UserRound className="w-5 h-5" />}
                    {user.status == "Banido" && <UserRoundX className="w-5 h-5" />}
                  </div>
                  {user.email}
                </td>
                <td className="px-3 py-3 text-center text-xs">
                  <span className={`px-2 py-1 rounded-full font-medium  ${statusStyle}`}>{user.status}</span>
                </td>
                <td className="px-3 py-3 text-center text-sm">{new Date(user.created_at).toLocaleDateString("pt-BR")}</td>
                <td className="px-3 py-3 text-center text-sm">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("pt-BR") : "—"}</td>
                <td className="px-3 py-3 text-center text-sm flex items-center justify-evenly">
                  <ActionButton icon={<UserRoundPen className="w-5 h-5" />} label="Atualizar" action="updateUser" userId={user.id} />
                  <ActionButton icon={<KeyRound className="w-5 h-5" />} label="Resetar Senha" action="sendPasswordReset" email={user.email} />
                  {user.status === "Banido" ? (
                    <ActionButton icon={<ShieldBan className="w-5 h-5" />} label="Desbanir" action="unbanUser" userId={user.id} />
                  ) : (
                    <ActionButton icon={<ShieldCheck className="w-5 h-5" />} label="Banir" action="banUser" userId={user.id} />
                  )}
                  {user.status === "A Confirmar" ? (
                    <ActionButton icon={<MailCheck className="w-5 h-5" />} label="Verificar Email" action="sendEmailVerification" email={user.email} />
                  ) : (
                    <MailCheck className="w-5 h-5 text-green-600" />
                  )}
                  <ActionButton icon={<Trash2 className="w-5 h-5 text-accent" />} label="Excluir" action="deleteUser" userId={user.id} />
                </td>
              </tr>
            )
          })}
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-sm text-dark/50">Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
