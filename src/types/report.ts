import { useReportFilter } from "@/context/reportFilterContext"
import { useReportsData } from "@/hooks/useReportsData"

export type Report = {
  id: string
  business_id: string
  operator: string
  department: string
  period: string
  sent_messages_count: number
  received_messages_count: number
  total_messages_count: number
  opened_tickets_count: number
  closed_tickets_count: number
  total_tickets_count: number
  waiting_time: string
  waiting_time_after_bot: string
  waiting_time_avg: string
  ticket_time: string
  contacts_count: number
  created_at: string
}

export type ReportFilterContextType = {
  selectedPeriod: string
  selectedOperatorDepartment: string
  setSelectedPeriod: (period: string) => void
  setSelectedOperatorDepartment: (value: string) => void
}

export type FilterSectionProps = {
  reportData: ReturnType<typeof useReportsData>
  reportFilters: ReturnType<typeof useReportFilter>
}