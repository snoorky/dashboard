"use client"

import AverageTime from "@/components/report/charts/averageTime"
import TopUsers from "@/components/report/charts/topUsers"
import { Filters } from "@/components/report/filters"
import { PerformanceMetrics } from "@/components/report/performance"
import { TableDesktop } from "@/components/report/tableDesktop"
import { TableMobile } from "@/components/report/tableMobile"
import { useReportFilter } from "@/context/reportFilterContext"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReportsData } from "@/hooks/useReportsData"
import { ChartNoAxesCombined } from "lucide-react"

export default function Reports() {
  const reportFilter = useReportFilter()
  const reportsData = useReportsData()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isDesktop = useMediaQuery("(max-width: 1280px)")

  return (
    <div className="py-8 space-y-4">
      {isDesktop && (
        <>
          <div className="flex items-center gap-2 mb-1 md">
            <ChartNoAxesCombined className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Atendimento</h1>
          </div>
          <p className="text-sm">Acompanhe as métricas de atendimento</p>
        </>
      )}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <PerformanceMetrics data={reportsData.filteredReports} />
      </section>

      {!isMobile && (
        <section className="hidden xl:block">
          <Filters reportData={reportsData} reportFilters={reportFilter} />
        </section>
      )}

      {isMobile
        ? (
          <section className="md:hidden space-y-2">
            <TableMobile data={reportsData.filteredReports} />
          </section>
        )
        : (
          <section className="w-full">
            <TableDesktop reportData={reportsData} reportFilters={reportFilter} />
          </section>
        )
      }

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AverageTime reports={reportsData.filteredReports} />
        <TopUsers reports={reportsData.filteredReports} />
      </section>
    </div>
  )
}