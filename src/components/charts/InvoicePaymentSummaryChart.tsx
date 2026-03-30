"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ReceiptText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard.types";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";

type InvoicePaymentSummaryChartProps = {
  overview: DashboardOverview;
};

const STATUS_COLORS = {
  paid: "#12B76A",
  pending: "#7F56D9",
  overdue: "#F04438",
  canceled: "#667085",
};

const InvoicePaymentSummaryChart = ({ overview }: InvoicePaymentSummaryChartProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useContainerDimensions(chartContainerRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const invoiceSummary = overview.invoices;

  const data = useMemo(
    () => [
      {
        name: "Paid",
        value: invoiceSummary?.paid ?? 0,
        color: STATUS_COLORS.paid,
      },
      {
        name: "Pending",
        value: invoiceSummary?.pending ?? 0,
        color: STATUS_COLORS.pending,
      },
      {
        name: "Overdue",
        value: invoiceSummary?.overdue ?? 0,
        color: STATUS_COLORS.overdue,
      },
      {
        name: "Canceled",
        value: invoiceSummary?.canceled ?? 0,
        color: STATUS_COLORS.canceled,
      },
    ],
    [invoiceSummary]
  );

  const totalInvoices = invoiceSummary?.total ?? 0;

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ReceiptText className="h-5 w-5 text-[#CBB5FF]" />
          Invoice Payment Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_220px]">
          <div ref={chartContainerRef} className="h-[300px] w-full min-h-0 min-w-0">
            {dimensions.isReady && dimensions.width > 0 && dimensions.height > 0 && (
              <ResponsiveContainer width={dimensions.width} height={dimensions.height} minWidth={0} minHeight={0}>
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: "#101828",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "16px",
                      color: "#FFFFFF",
                    }}
                  />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={72}
                    outerRadius={112}
                    paddingAngle={4}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                    isAnimationActive={false}
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3">
            <div className="rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#CBB5FF]">Total Invoices</p>
              <p className="mt-2 text-3xl font-bold text-white">{totalInvoices}</p>
            </div>

            {data.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-sm text-[#94A3B8]">{item.name}</p>
                  </div>

                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {invoiceSummary?.totalsByCurrency?.length ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Amount Summary</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {invoiceSummary.totalsByCurrency.map((item) => (
                <div
                  key={item.currency}
                  className="rounded-2xl border border-white/10 bg-[#101828]/70 p-4"
                >
                  <p className="text-sm font-medium text-white">{item.currency}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#94A3B8]">Collected</span>
                      <span className="font-medium text-[#12B76A]">{item.collectedAmount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#94A3B8]">Outstanding</span>
                      <span className="font-medium text-white">{item.outstandingAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default InvoicePaymentSummaryChart;
