import { NavItemProps } from "@/types/navigation"
import Link from "next/link"

type NavItemComponentProps = {
  item: NavItemProps
  isActive: boolean
  variant: "mobile" | "desktop"
}

export function NavItem({ item, isActive, variant }: NavItemComponentProps) {
  if (variant === "mobile") {
    return (
      <Link 
        href={item.url} 
        className={`relative z-10 flex items-center gap-2 py-2 px-3 rounded-full font-medium ${
          isActive ? "bg-accent text-light" : ""
        }`}
      >
        {item.icon}
        <span className={!isActive ? "sr-only" : ""}>{item.name}</span>
      </Link>
    )
  }

  return (
    <Link 
      href={item.url} 
      className={`flex items-center gap-1 w-full rounded-full text-sm ${
        isActive && "bg-accent"
      }`}
    >
      <span className={`p-2 m-1 rounded-full text-accent ${
        isActive ? "bg-light" : "bg-accent/15"
      }`}>
        {item.icon}
      </span>
      <span className={isActive ? "text-light" : "text-dark"}>{item.name}</span>
    </Link>
  )
}