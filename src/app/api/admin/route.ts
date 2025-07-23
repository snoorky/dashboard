import supabaseAdmin from "@/supabase/admin"
import { NextRequest, NextResponse } from "next/server"

const isAdminEmail = (email: string | null) => {
  return !!email && email.endsWith("@beforce.com.br")
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")

  if (!isAdminEmail(authHeader)) return NextResponse.json({ error: "Acesso negado" }, { status: 401 })

  const body = await req.json()
  const { action, payload } = body

  if (!action) return NextResponse.json({ error: "Ação não especificada" }, { status: 400 })

  try {
    switch (action) {
      case "createUser": {
        const { email, password, metadata } = payload
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: metadata || {},
        })
        if (error) throw error
        return NextResponse.json({ user: data.user })
      }

      case "getUsers": {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers()
        if (error) throw error
        return NextResponse.json({ users: data.users })
      }

      case "deleteUser": {
        const { userId } = payload
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
        if (error) throw error
        return NextResponse.json({ success: true })
      }

      case "updateUser": {
        const { userId, updates } = payload
        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, updates)
        if (error) throw error
        return NextResponse.json({ user: data.user })
      }

      default:
        return NextResponse.json({ error: "Ação inválida" }, { status: 400 })
    }
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}