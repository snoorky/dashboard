export type NavItemProps = {
  icon: React.ReactNode
  name: string
  url: string
}

export type NavActionButtonProps = {
  icon: React.ReactNode
  condition: boolean
  ariaLabel: string
  onClick: () => void
}