"use client";

import { Report } from "@/utils/types";
import { Frown, Smile } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ClientChartProps {
  reports?: Report[] | null;
}

export default function ClientChart({ reports }: ClientChartProps) {
  const safeReports = reports ?? [];
  const data = safeReports.map((user) => ({
    name: `${user.operator.split(" ")[0].trim()}`,
    tickets: user.total_tickets_count,
  }));

  const CustomizedDot = (props: any) => {
    const { cx, cy, value } = props;

    if (value >= 20) {
      return <Smile x={cx - 12} y={cy - 12} fill="green" stroke="white" />
    }

    return <Frown x={cx - 12} y={cy - 12} fill="red" stroke="white" />
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 30, left: -30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="tickets" dot={<CustomizedDot />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}