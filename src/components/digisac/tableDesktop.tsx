import { Report } from "@/app/dashboard/digisac/page";
import { UsersRound } from "lucide-react";
import { useMemo } from "react";

type TableDesktopProps = {
  reportsByPeriod: Record<string, Report[]>;
  selectedPeriod: string;
  selectedOperator: string;
  operatorOptions: string[];
};

export function TableDesktop({ reportsByPeriod, selectedPeriod, selectedOperator, operatorOptions }: TableDesktopProps) {
  const metrics = useMemo(() => ([
    { label: "Tempo médio de chamados", key: "ticket_time", type: "time" },
    { label: "Tempo médio da primeira espera", key: "waiting_time", type: "time" },
    { label: "Tempo médio após o bot", key: "waiting_time_after_bot", type: "time" },
    { label: "Tempo médio de espera", key: "waiting_time_avg", type: "time" },
    { label: "Mensagens enviadas", key: "sent_messages_count", type: "count" },
    { label: "Mensagens recebidas", key: "received_messages_count", type: "count" },
    { label: "Total de chamados", key: "total_tickets_count", type: "count" },
  ]), []);

  const data = useMemo(() => {
    const operators = operatorOptions.filter((op) => op !== "Todos");

    return operators.map((operator) => {
      const reports = (reportsByPeriod[selectedPeriod] || []).filter((item) => item.operator?.startsWith(operator));

      const values = metrics.map((metric) => {
        if (!reports.length) return "-";
        const v = reports[0][metric.key as keyof Report];
        return v ?? "-";
      });

      return { operator, values };
    });
  }, [reportsByPeriod, selectedPeriod, operatorOptions, metrics]);

  return (
    <div className="hidden md:block w-full">
      <div className="w-full overflow-auto max-h-104 relative rounded-xl border border-surface bg-light">
        <table className="min-w-max w-full">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className="bg-dark/3">
              <th className="px-3 py-3 text-sm font-medium text-left">
                Usuários
              </th>
              {metrics.map((m) => (
                <th key={m.key} className="px-3 py-3 text-sm font-medium text-left">
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isDimmed = selectedOperator !== "Todos" && selectedOperator !== item.operator;

              return (
                <tr key={index} className={`border-b last:border-none border-surface even:bg-dark/5 ${isDimmed ? "opacity-40" : "opacity-100"}`}>
                  <td className="px-3 py-3 text-sm flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-accent bg-accent/10">
                      <UsersRound className="w-4 h-4" />
                    </div>
                    {item.operator}
                  </td>
                  {item.values.map((value, index) => (
                    <td key={index} className="px-3 py-3 text-sm text-center">{value}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
