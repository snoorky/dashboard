export function toSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export function toMinutes(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number)
  return hours * 60 + minutes + seconds / 60
}

export function toTimeString(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":")
}

export function getAverageTime(timeStrings: string[]): string {
  if (timeStrings.length === 0) return "00:00:00"
  const totalSeconds = timeStrings.reduce((sum, timeString) => sum + toSeconds(timeString), 0)
  const avgSeconds = Math.floor(totalSeconds / timeStrings.length)
  return toTimeString(avgSeconds)
}