import { Report } from "@/app/dashboard/report/page";
import Card from "@/components/ui/card";
import { ApexOptions } from "apexcharts";
import { PieChart } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TicketsPerDepartment({ reports }: { reports: Report[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();

    for (const report of reports) {
      const key = report.department || "Sem Departamento";
      const prev = map.get(key) || 0;
      map.set(key, prev + report.total_tickets_count);
    }

    const labels = Array.from(map.keys());
    const series = Array.from(map.values());

    return { labels, series };
  }, [reports]);

  const options: ApexOptions = {
    labels: data.labels,
    legend: { position: "right" },
    tooltip: {
      y: {
        formatter: (value: number) => `${value.toLocaleString()} chamados`,
      },
    },
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Chamados",
              fontSize: "12px",
              fontWeight: 400,
              color: "#111111",
              formatter: () => { return data.series.reduce((acc, val) => acc + val, 0).toLocaleString() },
            },
          },
        },
      },
    },
  };

  return (
    <Card>
      <div className="flex items-center gap-2">
        <PieChart className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold">Distribuição de Chamados por Departamento</h2>
      </div>
      <p className="text-sm mb-2">Acompanhe as métricas de atendimento</p>
      <ReactApexChart options={options} series={data.series} type="donut" height={350} />
    </Card>
  );
}
