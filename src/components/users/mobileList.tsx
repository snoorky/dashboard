"use client"

import { UserWithStatus } from "@/types/user"
import { UserRoundCheck, UserRound, UserRoundX, ChevronDown, UserRoundPen, KeyRound, ShieldBan, ShieldCheck, MailWarning, MailCheck, Trash2 } from "lucide-react"
import { useState } from "react"
import { ActionButton } from "../ui/actionAPI"
import { getStatusStyle } from "@/utils/userStatus"

export default function UsersMobileList({ users }: { users: UserWithStatus[] }) {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null)

  const toggleExpand = (id: string) => { setExpandedUserId(prev => (prev === id ? null : id)) }

  return (
    <div className="md:hidden space-y-2">
      {users.map(user => {
        const statusStyle = getStatusStyle(user.status)
        const isExpanded = expandedUserId === user.id

        return (
          <div key={user.id} className="p-2 rounded-xl border border-surface bg-light" onClick={() => toggleExpand(user.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusStyle}`}>
                  {user.status == "Ativo" && <UserRoundCheck className="w-5 h-5" />}
                  {user.status == "A Confirmar" && <UserRound className="w-5 h-5" />}
                  {user.status == "Banido" && <UserRoundX className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <ChevronDown className={isExpanded ? "rotate-180" : ""} />
            </div>

            {isExpanded && (
              <div className="mt-3 space-y-3 text-sm text-dark/75">
                <div className="grid grid-cols-2 gap-1 mb-4">
                  <p><b>Status:</b> <span className={`px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>{user.status}</span></p>
                  <p><b>Último login:</b> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("pt-BR") : "—"}</p>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <ActionButton icon={<UserRoundPen className="w-5 h-5" />} label="Atualizar" action="updateUser" userId={user.id} />
                    <span className="text-xs">Atualizar</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ActionButton icon={<KeyRound className="w-5 h-5" />} label="Resetar Senha" action="sendPasswordReset" email={user.email} />
                    <span className="text-xs">Senha</span>
                  </div>
                  {user.status === "Banido" ? (
                    <div className="flex flex-col items-center gap-1">
                      <ActionButton icon={<ShieldBan className="w-5 h-5" />} label="Desbanir" action="unbanUser" userId={user.id} />
                      <span className="text-xs">Desbanir</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <ActionButton icon={<ShieldCheck className="w-5 h-5" />} label="Banir" action="banUser" userId={user.id} />
                      <span className="text-xs">Banir</span>
                    </div>
                  )}
                  <div className={`flex flex-col items-center gap-1 ${user.status === "A Confirmar" ? "" : "text-green-600"}`}>
                    {user.status === "A Confirmar" ? (
                      <>
                        <ActionButton icon={<MailWarning className="w-5 h-5" />} label="Verificar Email" action="sendEmailVerification" email={user.email} />
                        <span className="text-xs">Verificar</span>
                      </>
                    ) : (
                      <>
                        <MailCheck className="w-5 h-5" />
                        <span className="text-xs">Verificado</span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-1 text-accent">
                    <ActionButton icon={<Trash2 className="w-5 h-5" />} label="Excluir" action="deleteUser" userId={user.id} />
                    <span className="text-xs">Excluir</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {
        users.length === 0 && (
          <div className="flex items-center justify-center min-h-40">
            <p className="text-sm text-dark/50">Nenhum usuário encontrado.</p>
          </div>
        )
      }
    </div >
  )
}