"use client";

import AverageTime from "@/components/digisac/charts/averageTime";
import TicketsPerDepartment from "@/components/digisac/charts/ticketsDepartment";
import TopUsers from "@/components/digisac/charts/topUsers";
import { Filters } from "@/components/digisac/filters";
import { PerformanceMetrics } from "@/components/digisac/performance";
import { TableDesktop } from "@/components/digisac/tableDesktop";
import { TableMobile } from "@/components/digisac/tableMobile";
import { useAuth } from "@/utils/authContext";
import { getPreviousMonthPeriod } from "@/utils/functions";
import supabase from "@/utils/supabase";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { ChartNoAxesCombined } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
	const router = useRouter();
	const isMobile = useMediaQuery("(max-width: 48rem)");

	const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
	const [reportsByPeriod, setReportsByPeriod] = useState<Record<string, Report[]>>({});
	const [selectedPeriod, setSelectedPeriod] = useState<string>(getPreviousMonthPeriod());
	const [selectedOperatorDepartment, setSelectedOperatorDepartment] = useState("Todos");
	const [filteredReports, setFilteredReports] = useState<Report[]>([]);

	useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);

	useEffect(() => {
		if (!company?.id) return;

		async function loadPeriods() {
			const { data, error } = await supabase.from("reports").select("period").eq("business_id", company?.id);
			if (!error && data) setAvailablePeriods(Array.from(new Set(data.map((report) => report.period))));
		}

		loadPeriods();
	}, [company?.id]);

	useEffect(() => {
		if (!company?.id || reportsByPeriod[selectedPeriod]) return;

		async function loadReportsByPeriod() {
			const { data, error } = await supabase.from("reports").select("*").eq("business_id", company?.id).eq("period", selectedPeriod);
			if (!error && data) setReportsByPeriod((prevCache) => ({ ...prevCache, [selectedPeriod]: data }));
		}

		loadReportsByPeriod();
	}, [selectedPeriod, company?.id, reportsByPeriod]);

	useEffect(() => {
		const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];

		if (selectedOperatorDepartment === "Todos") setFilteredReports(reportsForPeriod);
		else {
			const [operator, department] = selectedOperatorDepartment.split("||");
			setFilteredReports(reportsForPeriod.filter((report) => report.operator === operator && report.department === department));
		}
	}, [selectedOperatorDepartment, selectedPeriod, reportsByPeriod]);

	const operatorOptions = useMemo(() => {
		const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];
		const seen = new Set<string>();
		const options: { label: string; value: string }[] = [];

		for (const report of reportsForPeriod) {
			const key = `${report.operator}||${report.department}`;
			if (!seen.has(key)) {
				seen.add(key);
				options.push({
					label: `${report.operator} (${report.department})`,
					value: key,
				});
			}
		} return [{ label: "Todos", value: "Todos" }, ...options];
	}, [reportsByPeriod, selectedPeriod]);

	return (
		<div className="py-8 space-y-4">
			<div className="flex items-center gap-2 mb-1">
				<ChartNoAxesCombined className="w-6 h-6 text-accent" />
				<h1 className="text-2xl font-bold">Relatórios Digisac</h1>
			</div>
			<p className="text-sm">Acompanhe as métricas de atendimento</p>

			<PerformanceMetrics data={filteredReports} />

			<Filters
				availablePeriods={availablePeriods}
				operatorOptions={operatorOptions}
				selectedOperator={selectedOperatorDepartment}
				setSelectedOperator={setSelectedOperatorDepartment}
				selectedPeriod={selectedPeriod}
				setSelectedPeriod={(period) => {
					setSelectedPeriod(period);
					setSelectedOperatorDepartment("Todos");
				}}
			/>

			{isMobile
				? <TableMobile reports={filteredReports} />
				: <TableDesktop reportsByPeriod={reportsByPeriod} selectedPeriod={selectedPeriod} selectedOperator={selectedOperatorDepartment} operatorOptions={operatorOptions} />
			}

			<section>
				<AverageTime reports={filteredReports} />
			</section>

			<section className="grid grid-cols-2 gap-4">
				{filteredReports.length > 0 && (
					<>
						<TicketsPerDepartment reports={filteredReports} />
						<TopUsers reports={filteredReports} />
					</>
				)}
			</section>
		</div>
	);
}