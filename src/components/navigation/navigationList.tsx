import { NavItemProps } from "@/types/navigation"
import { usePathname } from "next/navigation"
import { NavItem } from "./navItem"

type NavigationListProps = {
  items: NavItemProps[]
  variant: "mobile" | "desktop"
  title?: string
}

export function NavigationList({ items, variant, title }: NavigationListProps) {
  const pathname = usePathname()

  if (variant === "mobile") {
    return (
      <>
        {items.map((item, index) => {
          const isActive = pathname === item.url
          return (
            <NavItem
              key={index}
              item={item}
              isActive={isActive}
              variant="mobile"
            />
          )
        })}
      </>
    )
  }

  return (
    <nav className="flex flex-col gap-2">
      {title && (
        <span className="text-xs font-semibold pb-1 pt-4 text-dark/75">
          {title}
        </span>
      )}
      {items.map((item, index) => {
        const isActive = pathname === item.url
        return (
          <NavItem
            key={index}
            item={item}
            isActive={isActive}
            variant="desktop"
          />
        )
      })}
    </nav>
  )
}