import { Report } from "@/app/dashboard/report/page";
import Card from "@/components/ui/card";
import { ApexOptions } from "apexcharts";
import { Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TopUsers({ reports }: { reports: Report[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();

    for (const report of reports) {
      const user = report.operator || "Sem Usuário";
      const count = report.closed_tickets_count || 0;
      map.set(user, (map.get(user) || 0) + count);
    }

    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const categories = sorted.map((i) => i[0]).reverse();
    const seriesData = sorted.map((i) => i[1]).reverse();

    return { categories, seriesData };
  }, [reports]);

  const series = [{ name: "Chamados Resolvidos", data: data.seriesData }];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      dropShadow: { enabled: true },
    },
    plotOptions: {
      bar: {
        barHeight: "80%",
        horizontal: true,
        distributed: true,
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (_, options) => { return options.w.globals.labels[options.dataPointIndex] },
    },
    xaxis: { categories: data.categories },
    legend: { show: false },
  };

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold">Top 5 Usuários que mais Resolveram Chamados</h2>
      </div>
      <p className="text-sm mb-2">Acompanhe as métricas de atendimento</p>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </Card>
  );
}
