import { NavItemProps } from "@/types/navigation"
import { LayoutDashboard, Headphones, Globe2, Users, Building2, UserCog } from "lucide-react"

export const navigation: NavItemProps[] = [
  { icon: <LayoutDashboard className="w-4.5 h-4.5" />, name: "Dashboard", url: "/dashboard" },
  { icon: <Headphones className="w-4.5 h-4.5" />, name: "Atendimento", url: "/dashboard/report" },
  { icon: <Globe2 className="w-4.5 h-4.5" />, name: "Website", url: "/dashboard/website" },
  { icon: <Users className="w-4.5 h-4.5" />, name: "Equipe", url: "/dashboard/team" },
]

export const adminNavigation: NavItemProps[] = [
  { icon: <Building2 className="w-4.5 h-4.5" />, name: "Empresas", url: "/dashboard/companies" },
  { icon: <UserCog className="w-4.5 h-4.5" />, name: "Usuários", url: "/dashboard/users" },
]

export const mobileNavigation: NavItemProps[] = [
  { icon: <LayoutDashboard className="w-4.5 h-4.5" />, name: "Painel", url: "/dashboard" },
  { icon: <Headphones className="w-4.5 h-4.5" />, name: "Digisac", url: "/dashboard/report" },
  { icon: <Globe2 className="w-4.5 h-4.5" />, name: "Website", url: "/dashboard/website" },
  { icon: <Users className="w-4.5 h-4.5" />, name: "Equipe", url: "/dashboard/team" },
]