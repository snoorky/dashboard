import { UserBase, UserStatus } from "@/types/user"

export function getUserStatus(user: UserBase): UserStatus {
  const now = new Date()
  if (user.banned_until && new Date(user.banned_until) > now) return "Banido"
  if (user.email_confirmed_at) return "Ativo"
  return "A Confirmar"
}

export function getStatusStyle(status: UserStatus): string {
  switch (status) {
    case "Ativo":
      return "text-emerald-600 bg-emerald-100"
    case "A Confirmar":
      return "text-amber-600 bg-amber-100"
    case "Banido":
      return "text-rose-600 bg-rose-100"
    default:
      return "bg-gray-200 text-gray-800"
  }
}