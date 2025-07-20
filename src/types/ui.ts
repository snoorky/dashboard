export type SelectProps = {
  id: string
  label: string
  options: { label: string, value: string }[]
  value: string
  onChange: (value: string) => void
}