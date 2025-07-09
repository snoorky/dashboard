"use client";

import { Report } from "@/utils/types";
import { Frown, Smile } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ClientChartProps {
  reports?: Report[] | null;
}

type CustomDotProps = {
  cx?: number;
  cy?: number;
  value?: number;
};

export default function ClientChart({ reports }: ClientChartProps) {
  const safeReports = reports ?? [];
  const data = safeReports.map((user) => ({
    name: `${user.operator.split(" ")[0].trim()}`,
    tickets: user.total_tickets_count,
  }));

  const CustomizedDot = ({ cx, cy, value }: CustomDotProps) => {
    if (cx === undefined || cy === undefined || value === undefined) return null;

    return value >= 20
      ? <Smile x={cx - 12} y={cy - 12} fill="green" stroke="white" />
      : <Frown x={cx - 12} y={cy - 12} fill="red" stroke="white" />;
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