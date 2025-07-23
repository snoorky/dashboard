export type UserStatus = "Ativo" | "A Confirmar" | "Banido"

export type UserWithStatus = UserBase & { status: UserStatus }

export type UserBase = {
  id: string
  email: string
  phone: string
  created_at: string
  last_sign_in_at?: string
  email_confirmed_at?: string
  confirmation_sent_at?: string
  user_metadata: { email_verified?: boolean }
  banned_until?: string
  confirmed_at?: string
}

export type AdminActions = {
  icon: React.ReactNode
  label: string
  action: string
  userId?: string
  email?: string
}