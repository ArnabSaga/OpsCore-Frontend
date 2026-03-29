"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import type { RevenueMonthlySeriesItem } from "@/components/features/analytics/types/analytics.types";

type RevenueTrendChartProps = {
  series: RevenueMonthlySeriesItem[];
};

const RevenueTrendChart = ({ series }: RevenueTrendChartProps) => {
  const data = series.map((item) => ({
    month: item.month,
    issued: Number(item.issuedAmount),
    collected: Number(item.collectedAmount),
    currency: item.currency,
  }));

  return (
    <AnalyticsSectionCard
      title="Revenue trend"
      description="Monthly invoice issued versus collected amounts."
      className="h-[360px]"
    >
      <div className="h-[260px] min-w-0">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">
            No monthly revenue data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="issued" stroke="#7F56D9" strokeWidth={3} dot={false} />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#12B76A"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </AnalyticsSectionCard>
  );
};

export default RevenueTrendChart;
