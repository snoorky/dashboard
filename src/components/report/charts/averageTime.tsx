"use client"

import Card from "@/components/ui/card"
import { Report } from "@/types/report"
import { getAverageTime, toMinutes } from "@/utils/timeConversion"
import { ApexOptions } from "apexcharts"
import { Clock } from "lucide-react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function AverageTime({ reports }: { reports: Report[] }) {
  const data = useMemo(() => {
    const map = new Map<string, string[]>()

    for (const report of reports) {
      const department = report.department || "Sem Departamento"
      if (!map.has(department)) map.set(department, [])
      map.get(department)!.push(report.ticket_time)
    }

    const items = Array.from(map.entries()).map(([department, times]) => {
      const avgStr = getAverageTime(times)
      const avgMin = toMinutes(avgStr)
      return { department, avgTimeStr: avgStr, avgMin }
    }).sort((a, b) => b.avgMin - a.avgMin)

    return {
      categories: items.map((i) => i.department),
      seriesData: items.map((i) => Number(i.avgMin.toFixed(2))),
      formattedLabels: items.map((i) => i.avgTimeStr),
    }
  }, [reports])

  const series = [{ name: "Tempo médio de atendimento", data: data.seriesData }]

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        borderRadiusApplication: "end",
        dataLabels: { position: "top" },
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (_, options) => { return data.formattedLabels[options.dataPointIndex] || "" },
      style: {
        colors: ["#000000"],
        fontSize: "10px",
        fontWeight: "bold",
      },
      offsetY: -24,
    },
    xaxis: {
      categories: data.categories,
      tickAmount: 6,
      labels: { style: { fontSize: "8px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toFixed(0)} min`,
        style: { fontSize: "12px" },
      }
    },
    tooltip: {
      y: { formatter: (_, options) => { return data.formattedLabels[options.dataPointIndex] } },
    },
    legend: { show: true },
  }

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold">Atendimento por Departamento</h2>
      </div>
      <p className="text-sm mb-2">Acompanhe as métricas de atendimento</p>
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: `${data.categories.length * 80}px` }}>
          <ReactApexChart options={options} series={series} type="bar" height={400} />
        </div>
      </div>
    </Card >
  )
}