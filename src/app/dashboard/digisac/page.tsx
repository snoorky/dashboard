"use client"

import { useAuth } from "@/utils/authContext";
import { Filters } from "@/components/digisac/filters";
import { PerformanceMetrics } from "@/components/digisac/performance";
import { TableDesktop } from "@/components/digisac/tableDesktop";
import { TableMobile } from "@/components/digisac/tableMobile";
import { getPreviousMonthPeriod } from "@/utils/functions";
import supabase from "@/utils/supabase";
import { ChartNoAxesCombined } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "@/utils/useMediaQuery";

export type Report = {
  id: string;
  business_id: string;
  operator: string;
  department: string;
  period: string;
  sent_messages_count: number;
  received_messages_count: number;
  total_messages_count: number;
  opened_tickets_count: number;
  closed_tickets_count: number;
  total_tickets_count: number;
  waiting_time: string;
  waiting_time_after_bot: string;
  waiting_time_avg: string;
  ticket_time: string;
  contacts_count: number;
  created_at: string;
};

export default function Dashboard() {
  const { company, loading, user } = useAuth();
  const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [reportsByPeriod, setReportsByPeriod] = useState<Record<string, Report[]>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>(getPreviousMonthPeriod());
  const [selectedOperator, setSelectedOperator] = useState<string>("Todos");
  const isMobile = useMediaQuery("(max-width: 48rem)");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (!company?.id) return;

    async function loadAvailablePeriods() {
      const { data, error } = await supabase.from("reports").select("period").eq("business_id", company?.id)
      if (!error && data) setAvailablePeriods(Array.from(new Set(data.map((report) => report.period))));
    }
    loadAvailablePeriods();
  }, [company?.id]);

  useEffect(() => {
    const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];
    if (selectedOperator === "Todos") setFilteredReports(reportsForPeriod);
    else setFilteredReports(reportsForPeriod.filter((report) => report.operator?.startsWith(selectedOperator)));
  }, [selectedOperator, selectedPeriod, reportsByPeriod]);

  useEffect(() => {
    if (!company?.id || reportsByPeriod[selectedPeriod]) return;

    async function loadReportsByPeriod() {
      const { data, error } = await supabase.from("reports").select("*").eq("business_id", company?.id).eq("period", selectedPeriod);
      if (!error && data) setReportsByPeriod((prevCache) => ({ ...prevCache, [selectedPeriod]: data }));
    }
    loadReportsByPeriod();
  }, [selectedPeriod, company?.id, reportsByPeriod]);

  const operatorOptions = useMemo(() => {
    const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];
    const uniqueOperators = new Set<string>();

    reportsForPeriod.forEach((report) => {
      if (report.operator) uniqueOperators.add(report.operator.split(" - ")[0].trim());
    });

    return ["Todos", ...Array.from(uniqueOperators)];
  }, [reportsByPeriod, selectedPeriod]);

  return (
    <main className="py-8 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <ChartNoAxesCombined className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold">Relatórios Digisac</h1>
      </div>
      <p className="text-gray-400">Acompanhe as métricas de atendimento</p>

      <PerformanceMetrics data={filteredReports} />

      <Filters
        operatorOptions={operatorOptions}
        selectedOperator={selectedOperator}
        setSelectedOperator={setSelectedOperator}
        availablePeriods={availablePeriods}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <section>
        {isMobile ? (
          <TableMobile reports={filteredReports} />
        ) : (
          <TableDesktop
            reportsByPeriod={reportsByPeriod}
            selectedPeriod={selectedPeriod}
            selectedOperator={selectedOperator}
            operatorOptions={operatorOptions}
          />
        )}
      </section>
    </main>
  );
}
