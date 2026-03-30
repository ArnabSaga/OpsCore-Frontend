"use client";

import { useRef } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import type { RevenueSummary } from "@/components/features/analytics/types/analytics.types";

type InvoicePaymentSummaryChartProps = {
  summary: RevenueSummary;
};

const InvoicePaymentSummaryChart = ({ summary }: InvoicePaymentSummaryChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useContainerDimensions(chartContainerRef);

  const data = [
    { name: "Paid", value: summary.paidInvoices },
    { name: "Pending", value: summary.pendingInvoices },
    { name: "Overdue", value: summary.overdueInvoices },
    { name: "Canceled", value: summary.canceledInvoices },
  ].filter((item) => item.value > 0);

  return (
    <AnalyticsSectionCard
      title="Payment mix"
      description="Distribution of invoice states for the selected range."
      className="h-[360px]"
    >
      <div ref={chartContainerRef} className="h-[260px] min-w-0">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">
            No invoice payment mix available.
          </div>
        ) : (
          dimensions.isReady &&
          dimensions.width > 0 &&
          dimensions.height > 0 && (
            <ResponsiveContainer width={dimensions.width} height={dimensions.height} minWidth={0} minHeight={0}>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={92} innerRadius={55}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={["#12B76A", "#7F56D9", "#F79009", "#667085"][index % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )
        )}
      </div>
    </AnalyticsSectionCard>
  );
};

export default InvoicePaymentSummaryChart;
