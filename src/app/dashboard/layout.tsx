"use client"

import Header from "@/components/layout/header"
import { NavBar } from "@/components/layout/navbar"
import { SideBar } from "@/components/layout/sidebar"
import { useAuth } from "@/context/authContext"
import { LayoutProvider } from "@/context/layoutContext"
import { ReportFilterProvider } from "@/context/reportFilterContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace("/")
  }, [user, loading, router])

  if (loading || !user) return null

  return (
    <LayoutProvider>
      <ReportFilterProvider>
        <NavBar />
        <div className="flex flex-col h-svh xl:h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden h-svh">
            <SideBar />
            <main className="flex-1 overflow-auto px-4 bg-surface/25">
              {children}
            </main>
          </div>
        </div>
        <Toaster position="top-center" />
      </ReportFilterProvider>
    </LayoutProvider>
  )
}