"use client"

import { useAuth } from "@/app/contexts/authContext";
import { Report } from "@/utils/types";
import { Bot, ChartNoAxesCombined, Clock, FileText, Hourglass, ListFilterPlus, MessageCircleMore, MessageCircleOff, MessageCirclePlus, MessageSquare, Timer, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Select } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import supabase from "@/utils/supabase/client";
import { formatPeriod, getPreviousMonthPeriod } from "@/utils/functions";

export default function Digisac() {
	const { company } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
	const [selectedPeriod, setSelectedPeriod] = useState<string>(getPreviousMonthPeriod());
	const [reportsByPeriod, setReportsByPeriod] = useState<Record<string, Report[]>>({});
	const [filteredReports, setFilteredReports] = useState<Report[]>([]);
	const [selectedOperator, setSelectedOperator] = useState<string>("Todos");

	// Carrega os períodos disponíveis de relatórios da empresa
	useEffect(() => {
		if (!company?.id) return;

		async function loadAvailablePeriods() {
			setIsLoading(true);
			const { data, error } = await supabase.from("reports").select("period").eq("business_id", company?.id)
			if (!error && data) setAvailablePeriods(Array.from(new Set(data.map((report) => report.period))));
			setIsLoading(false);
		}

		loadAvailablePeriods();
	}, [company?.id]);

	// Carrega e cacheia relatórios para o período selecionado
	useEffect(() => {
		if (!company?.id || reportsByPeriod[selectedPeriod]) return;

		async function loadReportsByPeriod() {
			setIsLoading(true);
			const { data, error } = await supabase.from("reports").select("*").eq("business_id", company?.id).eq("period", selectedPeriod);
			if (!error && data) setReportsByPeriod((prevCache) => ({ ...prevCache, [selectedPeriod]: data }));
			setIsLoading(false);
		}

		loadReportsByPeriod();
	}, [selectedPeriod, company?.id, reportsByPeriod]);

	// Filtra os relatórios conforme operador selecionado
	useEffect(() => {
		const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];

		if (selectedOperator === "Todos") {
			setFilteredReports(reportsForPeriod);
		} else {
			const filtered = reportsForPeriod.filter((report) => report.operator?.startsWith(selectedOperator));
			setFilteredReports(filtered);
		}
	}, [selectedOperator, selectedPeriod, reportsByPeriod]);

	// Gera lista única de operadores a partir dos relatórios
	const operatorOptions = useMemo(() => {
		const reportsForPeriod = reportsByPeriod[selectedPeriod] || [];
		const uniqueOperators = new Set<string>();

		reportsForPeriod.forEach((report) => {
			if (report.operator) uniqueOperators.add(report.operator.split(" - ")[0].trim());
		});

		return ["Todos", ...Array.from(uniqueOperators)];
	}, [reportsByPeriod, selectedPeriod]);

	// Métricas agregadas (abertos, fechados, mensagens, contatos)
	const metricValues = useMemo(() => {
		return {
			opened: filteredReports.reduce((acc, report) => acc + Number(report.opened_tickets_count || 0), 0),
			closed: filteredReports.reduce((acc, report) => acc + Number(report.closed_tickets_count || 0), 0),
			messages: filteredReports.reduce((acc, report) => acc + Number(report.total_messages_count || 0), 0),
			contacts: filteredReports.reduce((acc, report) => acc + Number(report.contacts_count || 0), 0),
		};
	}, [filteredReports]);

	// Métricas principais do topo (abertos, fechados, mensagens, contatos)
	const performanceMetrics = [
		{ label: "Chamados abertos", style: "text-green-600 bg-green-100", icon: <MessageCirclePlus className="w-5 h-5" />, value: metricValues.opened },
		{ label: "Chamados fechados", style: "text-red-600 bg-red-100", icon: <MessageCircleOff className="w-5 h-5" />, value: metricValues.closed },
		{ label: "Total de mensagens", style: "text-blue-600 bg-blue-100", icon: <MessageCircleMore className="w-5 h-5" />, value: metricValues.messages },
		{ label: "Total de contatos", style: "text-purple-600 bg-purple-100", icon: <UsersRound className="w-5 h-5" />, value: metricValues.contacts }
	];

	// Template de todas as métricas que serão exibidas
	const metricsTemplate = useMemo(() => ([
		{ label: "Tempo médio de chamados", style: "text-sky-600 bg-sky-100", icon: <Hourglass className="w-5 h-5" />, key: "ticket_time", type: "time" },
		{ label: "Tempo médio da primeira espera", style: "text-orange-600 bg-orange-100", icon: <Timer className="w-5 h-5" />, key: "waiting_time", type: "time" },
		{ label: "Tempo médio após o bot", style: "text-amber-600 bg-amber-100", icon: <Bot className="w-5 h-5" />, key: "waiting_time_after_bot", type: "time" },
		{ label: "Tempo médio de espera", style: "text-violet-600 bg-violet-100", icon: <Clock className="w-5 h-5" />, key: "waiting_time_avg", type: "time" },
		{ label: "Mensagens enviadas", style: "text-emerald-600 bg-emerald-100", icon: <MessageSquare className="w-5 h-5" />, key: "sent_messages_count", type: "count" },
		{ label: "Mensagens recebidas", style: "text-cyan-600 bg-cyan-100", icon: <MessageCircleMore className="w-5 h-5" />, key: "received_messages_count", type: "count" },
		{ label: "Total de chamados", style: "text-rose-600 bg-rose-100", icon: <FileText className="w-5 h-5" />, key: "total_tickets_count", type: "count" },
	]), []);

	// Processa dados filtrados e retorna métricas calculadas
	const reportData = useMemo(() => {
		if (filteredReports.length === 0) return [];

		const getAverageTime = (times: string[]) => {
			const totalSeconds = times.reduce((sum, time) => {
				const [h, m, s] = time.split(":").map(Number);
				return sum + h * 3600 + m * 60 + s;
			}, 0);

			if (times.length === 0) return "00:00:00";

			const avg = Math.floor(totalSeconds / times.length);
			const h = String(Math.floor(avg / 3600)).padStart(2, "0");
			const m = String(Math.floor((avg % 3600) / 60)).padStart(2, "0");
			const s = String(avg % 60).padStart(2, "0");
			return `${h}:${m}:${s}`;
		};

		return metricsTemplate.map(metric => {
			let value;

			if (metric.type === "time") {
				value = getAverageTime(filteredReports.map(report => report[metric.key as keyof Report] as string));
			} else if (metric.type === "count") {
				value = filteredReports.reduce((total, report) => total + Number(report[metric.key as keyof Report] || 0), 0).toString()
			}

			return { ...metric, value };
		});
	}, [filteredReports, metricsTemplate]);

	// Agrupa dados por operador para exibição em tabela
	const reportDataPerOperator = useMemo(() => {
		const operators = operatorOptions.filter(op => op !== "Todos");

		return metricsTemplate.map(metric => {
			const values = operators.map(operator => {
				const reports = (reportsByPeriod[selectedPeriod] || []).filter(r => r.operator?.startsWith(operator));

				if (reports.length === 0) return "-";

				const value = reports[0][metric.key as keyof Report];
				return String(value ?? "-");
			});

			return {
				...metric,
				values,
			};
		});
	}, [reportsByPeriod, selectedPeriod, operatorOptions, metricsTemplate]);

	return (
		<main className="px-4 py-8 space-y-8">
			<div className="flex items-center gap-2 mb-1">
				<ChartNoAxesCombined className="w-7 h-7 text-primary" />
				<h1 className="text-3xl font-bold">Relatórios Digisac</h1>
			</div>
			<p>Acompanhe as métricas de atendimento</p>

			<section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
				{performanceMetrics.map((metric, index) => (
					<div key={index} className="p-3 rounded-xl border border-[#e5e7eb]">
						<div className="flex items-center gap-2">
							<div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${metric.style}`}>
								{isLoading ? (<Skeleton className="w-8 h-8" />) : (metric.icon)}
							</div>
							<span className="text-xl font-bold">
								{isLoading ? <Skeleton className="w-12 h-5" /> : metric.value}
							</span>
						</div>
						<span className="text-sm text-gray-600">{isLoading ? <Skeleton className="w-24 h-4 mt-1" /> : metric.label}</span>
					</div>
				))}
			</section>

			<section className="p-3 rounded-xl border border-[#e5e7eb]">
				<div className="flex items-center gap-2">
					<ListFilterPlus className="w-5 h-5 text-primary" />
					<h2 className="text-lg font-semibold">Filtros e Métricas</h2>
				</div>

				<div className="grid grid-cols-2 gap-2 md:gap-4 my-4 pb-4 border-b border-[#e5e7eb]">
					<Select
						id="operators"
						label="Funcionários"
						options={operatorOptions}
						value={selectedOperator}
						onChange={(value) => setSelectedOperator(value)}
					/>

					<Select
						id="periods"
						label="Períodos"
						options={availablePeriods.map((period) => formatPeriod(period))}
						value={formatPeriod(selectedPeriod)}
						onChange={(formattedValue) => {
							const originalPeriod = availablePeriods.find((raw) => formatPeriod(raw) === formattedValue);

							if (originalPeriod) {
								setSelectedPeriod(originalPeriod);
								setSelectedOperator("Todos");
							}
						}}
					/>
				</div>

				<div className="md:hidden space-y-4">
					{reportData.map((item, index) => (
						<div key={index} className="p-2 rounded-xl border border-[#e5e7eb] bg-gray-50">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.style}`}>
										{isLoading ? (<Skeleton className="w-8 h-8" />) : (item.icon)}
									</div>
									<span className="text-sm font-medium text-gray-600">
										{isLoading ? <Skeleton className="h-4 w-32" /> : item.label}
									</span>
								</div>
								<span className="font-bold">
									{isLoading ? <Skeleton className="h-4 w-12" /> : item.value}
								</span>
							</div>
						</div>
					))}
				</div>

				<div className="hidden md:block overflow-x-auto">
					<table className="min-w-max w-full">
						<thead>
							<tr className="bg-gray-50">
								<th className="w-72 px-3 py-3 text-left text-sm font-semibold rounded-l-lg">
									{isLoading ? (<Skeleton className="h-5 w-16" />) : ("Métrica")}
								</th>
								{operatorOptions.filter(op => op !== "Todos").map(operator => {
									const isDimmed = selectedOperator !== "Todos" && selectedOperator !== operator;

									return (
										<th key={operator} className={`px-3 py-3 text-center text-sm font-semibold last:rounded-r-lg ${isDimmed ? "opacity-40" : "opacity-100"}`}>
											{isLoading ? (<Skeleton className="h-4 w-20 mx-auto" />) : (operator)}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{reportDataPerOperator.map((metric, index) => (
								<tr key={index} className="border-b last:border-none border-[#e5e7eb]">
									<td className="flex items-center gap-2 w-72 p-3">
										<div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.style}`}>
											{isLoading ? (<Skeleton className="w-8 h-8" />) : (metric.icon)}
										</div>
										<span className="text-sm font-medium text-gray-600">
											{isLoading ? <Skeleton className="h-4 w-32" /> : metric.label}
										</span>
									</td>

									{metric.values.map((value, index) => {
										const operator = operatorOptions.filter(op => op !== "Todos")[index];
										const isDimmed = selectedOperator !== "Todos" && selectedOperator !== operator;

										return (
											<td key={index} className={`min-w-32 text-sm font-semibold text-center ${isDimmed ? "opacity-40" : "opacity-100"}`}>
												{isLoading ? <Skeleton className="h-4 w-20 mx-auto" /> : value}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
}
