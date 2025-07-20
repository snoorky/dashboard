export function toSeconds(time: string): number {
  const [h, m, s] = time.split(":").map(Number)
  return h * 3600 + m * 60 + s
}

export function toMinutes(time: string): number {
  const [h, m, s] = time.split(":").map(Number)
  return h * 60 + m + s / 60
}

export function toTimeString(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":")
}

export function getAverageTime(times: string[]): string {
  if (times.length === 0) return "00:00:00"
  const totalSeconds = times.reduce((sum, time) => sum + toSeconds(time), 0)
  const avgSeconds = Math.floor(totalSeconds / times.length)
  return toTimeString(avgSeconds)
}