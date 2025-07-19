const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  report: "Atendimento",
  website: "Website",
  team: "Equipe",
  companies: "Empresas",
  users: "Usuários",
}

export function getPageTitle(pathname: string): string {
  const parts = pathname.split("/")
  const key = parts[parts.length - 1] || parts[parts.length - 2]
  return pageTitles[key] ?? "Dashboard"
}