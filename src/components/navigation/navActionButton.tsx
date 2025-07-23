import { NavActionButtonProps } from "@/types/navigation"

export function NavActionButton({ icon, condition, ariaLabel, onClick }: NavActionButtonProps) {
  if (!condition) return null

  return (
    <button
      onClick={onClick}
      className="py-3 px-3 rounded-full shadow-sm border border-surface bg-accent text-light"
    >
      <span className="w-4.5 h-4.5" aria-label={ariaLabel}>
        {icon}
      </span>
    </button>
  )
}