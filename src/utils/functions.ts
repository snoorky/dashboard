export function getPreviousMonthPeriod() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  return `${currentDate.getFullYear()}-${month}`;
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-");
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]}/${year}`;
}

export function toSeconds(time: string): number {
  const [h, m, s] = time.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

export function toTimeString(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function getAverageTime(times: string[]): string {
  if (times.length === 0) return "00:00:00";
  const totalSeconds = times.reduce((sum, time) => sum + toSeconds(time), 0);
  const avgSeconds = Math.floor(totalSeconds / times.length);
  return toTimeString(avgSeconds);
}