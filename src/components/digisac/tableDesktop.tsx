import { Report } from "@/app/dashboard/digisac/page";
import { Bot, Clock, FileText, Hourglass, MessageCircleMore, MessageSquare, Timer } from "lucide-react";
import { useMemo } from "react";

type TableDesktopProps = {
  reportsByPeriod: Record<string, Report[]>;
  selectedPeriod: string;
  selectedOperator: string;
  operatorOptions: string[];
};

export function TableDesktop({ reportsByPeriod, selectedPeriod, selectedOperator, operatorOptions }: TableDesktopProps) {
  const metricsTemplate = useMemo(() => ([
    { label: "Tempo médio de chamados", style: "text-sky-600 bg-sky-100", icon: <Hourglass className="w-5 h-5" />, key: "ticket_time", type: "time" },
    { label: "Tempo médio da primeira espera", style: "text-orange-600 bg-orange-100", icon: <Timer className="w-5 h-5" />, key: "waiting_time", type: "time" },
    { label: "Tempo médio após o bot", style: "text-amber-600 bg-amber-100", icon: <Bot className="w-5 h-5" />, key: "waiting_time_after_bot", type: "time" },
    { label: "Tempo médio de espera", style: "text-violet-600 bg-violet-100", icon: <Clock className="w-5 h-5" />, key: "waiting_time_avg", type: "time" },
    { label: "Mensagens enviadas", style: "text-emerald-600 bg-emerald-100", icon: <MessageSquare className="w-5 h-5" />, key: "sent_messages_count", type: "count" },
    { label: "Mensagens recebidas", style: "text-cyan-600 bg-cyan-100", icon: <MessageCircleMore className="w-5 h-5" />, key: "received_messages_count", type: "count" },
    { label: "Total de chamados", style: "text-rose-600 bg-rose-100", icon: <FileText className="w-5 h-5" />, key: "total_tickets_count", type: "count" },
  ]), []);

  const reportDataPerOperator = useMemo(() => {
    const operators = operatorOptions.filter(op => op !== "Todos");

    return metricsTemplate.map(metric => {
      const values = operators.map(operator => {
        const reports = (reportsByPeriod[selectedPeriod] || []).filter(r => r.operator?.startsWith(operator));
        if (reports.length === 0) return "-";
        const value = reports[0][metric.key as keyof Report];
        return String(value ?? "-");
      });

      return { ...metric, values };
    });
  }, [reportsByPeriod, selectedPeriod, operatorOptions, metricsTemplate]);

  return (
    <div className="hidden md:block w-full overflow-x-auto">
      <table className="min-w-max w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-72 px-3 py-3 text-left text-sm font-semibold">Métrica"</th>
            {operatorOptions.filter(op => op !== "Todos").map(operator => {
              const isDimmed = selectedOperator !== "Todos" && selectedOperator !== operator;

              return (
                <th key={operator} className={`px-3 py-3 text-center text-sm font-semibold ${isDimmed ? "opacity-40" : "opacity-100"}`}>
                  {operator}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {reportDataPerOperator.map((metric, index) => (
            <tr key={index} className="border-b last:border-none border-surface even:bg-gray-50/25">
              <td className="flex items-center gap-2 w-72 p-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.style}`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium">
                  {metric.label}
                </span>
              </td>
              {metric.values.map((value, idx) => {
                const operator = operatorOptions.filter(op => op !== "Todos")[idx];
                const isDimmed = selectedOperator !== "Todos" && selectedOperator !== operator;

                return (
                  <td key={idx} className={`min-w-32 text-sm font-semibold text-center ${isDimmed ? "opacity-40" : "opacity-100"}`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
