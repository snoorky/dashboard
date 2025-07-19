"use client"

import { Report } from "@/app/dashboard/report/page"
import { useAuth } from "@/context/authContext"
import { useReportFilter } from "@/context/reportFilterContext"
import supabase from "@/utils/supabase"
import { useEffect, useMemo, useState } from "react"

export function useReportsData() {
  const { company } = useAuth()
  const reportFilter = useReportFilter()

  const [availablePeriods, setAvailablePeriods] = useState<string[]>([])
  const [reportsByPeriod, setReportsByPeriod] = useState<Record<string, Report[]>>({})
  const [filteredReports, setFilteredReports] = useState<Report[]>([])

  // Carrega os períodos
  useEffect(() => {
    if (!company?.id) return

    async function loadPeriods() {
      const { data, error } = await supabase.from("reports").select("period").eq("business_id", company?.id)
      if (!error && data) setAvailablePeriods(Array.from(new Set(data.map((report) => report.period))))
    }

    loadPeriods()
  }, [company?.id])

  // Carrega relatórios do período
  useEffect(() => {
    if (!company?.id || reportsByPeriod[reportFilter.selectedPeriod]) return

    async function loadReports() {
      const { data, error } = await supabase.from("reports").select("*").eq("business_id", company?.id).eq("period", reportFilter.selectedPeriod)
      if (!error && data) setReportsByPeriod((prevCache) => ({ ...prevCache, [reportFilter.selectedPeriod]: data }))
    }

    loadReports()
  }, [company?.id, reportFilter.selectedPeriod, reportsByPeriod])

  // Filtragem
  useEffect(() => {
    const reportsForPeriod = reportsByPeriod[reportFilter.selectedPeriod] || []

    if (reportFilter.selectedOperatorDepartment === "Todos") setFilteredReports(reportsForPeriod)
    else {
      const [operator, department] = reportFilter.selectedOperatorDepartment.split("||")
      setFilteredReports(reportsForPeriod.filter((report) => report.operator === operator && report.department === department))
    }
  }, [reportFilter.selectedOperatorDepartment, reportFilter.selectedPeriod, reportsByPeriod])

  // Geração de opções do filtro
  const operatorOptions = useMemo(() => {
    const reports = reportsByPeriod[reportFilter.selectedPeriod] || []
    const seen = new Set<string>()
    const options = []

    for (const report of reports) {
      const key = `${report.operator}||${report.department}`

      if (!seen.has(key)) {
        seen.add(key)
        options.push({ label: `${report.operator} (${report.department})`, value: key })
      }
    }

    return [{ label: "Todos", value: "Todos" }, ...options]
  }, [reportsByPeriod, reportFilter.selectedPeriod])

  return {
    availablePeriods,
    reportsByPeriod,
    filteredReports,
    operatorOptions,
  }
}