"use client"

import { AdminActions } from "@/types/user"
import toast from "react-hot-toast"

export function ActionButton({ icon, label, action, userId, email }: AdminActions) {
  const handleClick = () => {
    const confirmMsg = `Tem certeza que deseja ${label.toLowerCase()}?`

    toast((t) => (
      <div className="flex flex-col gap-2 p-2 text-sm">
        <span>{confirmMsg}</span>
        <div className="flex items-center justify-center gap-2">
          <button className="flex-1 p-2 font-medium rounded-lg bg-accent text-light" onClick={() => { toast.dismiss(t.id); executeAction() }}>
            Confirmar
          </button>
          <button className="flex-1 p-2 font-medium rounded-lg bg-gray-200" onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: 4000 })
  }

  const executeAction = async () => {
    const toastId = toast.loading(`${label} em andamento...`)

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "admin@beforce.com.br",
        },
        body: JSON.stringify({
          action,
          payload: {
            userId,
            email,
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/{rota-de-verificacao}`
          }
        }),
      })

      if (!res.ok) throw new Error()
      toast.success(`${label} feito com sucesso.`, { id: toastId, duration: 200 })
    } catch {
      toast.error(`Erro ao ${label.toLowerCase()}`, { id: toastId, duration: 200 })
    }
  }

  return (
    <button onClick={handleClick} title={label} className="cursor-pointer">{icon}</button>
  )
}