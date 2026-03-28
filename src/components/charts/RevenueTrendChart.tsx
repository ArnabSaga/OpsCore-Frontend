"use client";

import gsap from "gsap";
import { TrendingUp } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import type { DashboardRevenueMetricPoint } from "@/types/dashboard.types";

type RevenueTrendChartProps = {
  data: DashboardRevenueMetricPoint[];
};

const RevenueTrendChart = ({ data }: RevenueTrendChartProps) => {
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
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      paidAmount: Number(item.paidAmount || 0),
    }));
  }, [data]);

  const hasData = useMemo(() => {
    return chartData.some((p) => p.paidAmount > 0);
  }, [chartData]);

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <TrendingUp className="h-5 w-5 text-[#12B76A]" />
          Revenue Trend
        </CardTitle>
        {!hasData && (
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] opacity-60">
            No revenue recorded
          </span>
        )}
      </CardHeader>

      <CardContent>
        <div ref={chartContainerRef} className="h-[320px] w-full min-h-0 min-w-0">
          {dimensions.isReady && (
            <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#12B76A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#12B76A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#101828",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "16px",
                    color: "#FFFFFF",
                  }}
                  labelStyle={{ color: "#94A3B8", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey="paidAmount"
                  name="Paid Revenue"
                  stroke="#12B76A"
                  fill="url(#revenueFill)"
                  strokeWidth={2.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendChart;
