export function getPreviousMonthPeriod() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 1)
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0")
  return `${currentDate.getFullYear()}-${month}`
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-")
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  const monthIndex = parseInt(month, 10) - 1
  return `${monthNames[monthIndex]}/${year}`
}