"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "./authContext"
import { useEffect } from "react"

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) router.replace("/dashboard")
  }, [isAdmin, loading, router])

  if (loading || !isAdmin) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-dark/50">Carregando...</p>
      </div>
    )
  }

  return <>{children}</>
}
