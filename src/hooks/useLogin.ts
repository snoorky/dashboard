"use client"

import supabase from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useState, useEffect, FormEvent } from "react"

export function useLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) router.replace("/dashboard")
    }
    checkSession()
  }, [router])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) setError(error.message || "Erro ao fazer login.")
    else router.push("/dashboard")

    setIsLoading(false)
  }

  return {
    email, setEmail,
    password, setPassword,
    isLoading,
    error,
    handleSubmit
  }
}