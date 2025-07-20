"use client"

import { LayoutContextType } from "@/types/layout"
import { getPageTitle } from "@/utils/getPageTitle"
import { usePathname } from "next/navigation"
import { createContext, ReactNode, useContext, useMemo } from "react"

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const value = useMemo(() => ({
    pageTitle: getPageTitle(pathname),
  }), [pathname])

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayout must be used within a LayoutProvider")
  return context
}