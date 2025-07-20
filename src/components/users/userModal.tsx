"use client"

import { X } from "lucide-react"
import { useState, FormEvent } from "react"
import toast from "react-hot-toast"
import { Modal } from "../ui/modal"

export function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault()
    const toastId = toast.loading("Criando usuário...")

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "suporte@beforce.com.br",
        },
        body: JSON.stringify({
          action: "createUser",
          payload: { email, password }
        }),
      })

      if (!res.ok) throw new Error()

      setEmail("")
      setPassword("")
      toast.success("Usuário criado com sucesso!", { id: toastId })
      location.reload()
    } catch {
      toast.error("Erro ao adicionar usuário", { id: toastId })
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-4 animate-slide-up bg-light">
        <div className="relative mb-4">
          <h2 className="text-xl font-semibold">Adicionar Novo Usuário</h2>
          <p className="text-sm">Preencha os dados para criar um novo usuário.</p>
          <button onClick={onClose} className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleAdd} className="grid gap-4 py-2">
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full p-3 rounded-lg outline-none border border-surface focus:border-accent"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg outline-none border border-surface focus:border-accent"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full font-medium flex justify-center items-center p-3 rounded-lg disabled:cursor-not-allowed transition-colors duration-200 bg-accent text-light"
          >
            Adicionar
          </button>
        </form>
      </div>
    </Modal >
  )
}