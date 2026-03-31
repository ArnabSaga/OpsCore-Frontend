"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useContainerDimensions } from "@/hooks/useContainerDimensions";

type GrowthMetricItem = {
  key: string;
  label: string;
  users: number;
  workspaces: number;
  subscriptions: number;
};

type GrowthTrendChartProps = {
  data: GrowthMetricItem[];
  periodLabel: string;
};

const GrowthTrendChart = ({ data, periodLabel }: GrowthTrendChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerDimensions(containerRef);

  useEffect(() => {
    if (!chartRef.current) return;

    let frameId: number | null = null;
    const ctx = gsap.context(() => {
      frameId = requestAnimationFrame(() => {
        if (!chartRef.current) return;

        gsap.fromTo(
          chartRef.current,
          { opacity: 0, scale: 0.985, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      });
    }, chartRef);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!dimensions.isReady || !chartRef.current) return;

    const ctx = gsap.context(() => {
      const timeout = setTimeout(() => {
        if (!chartRef.current) return;
        const bars = gsap.utils.toArray(".recharts-bar-rectangle", chartRef.current);
        if (bars.length > 0) {
          gsap.fromTo(
            bars,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.04,
              ease: "power3.out",
              delay: 0.12,
            }
          );
        }
      }, 50);

      return () => clearTimeout(timeout);
    }, chartRef);

    return () => ctx.revert();
  }, [dimensions.isReady]);

  return (
    <div
      ref={chartRef}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.12),transparent_30%),linear-gradient(180deg,rgba(17,24,39,0.96)_0%,rgba(12,17,29,0.98)_100%)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#FF4DDF]/20 blur-3xl" />
        <div className="absolute left-1/2 top-[58%] h-16 w-40 -translate-x-1/2 rounded-full bg-[#7F56D9]/20 blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#7F56D9]/12 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
      </div>

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C7D7FE]">
            <span className="h-2 w-2 rounded-full bg-[#FF4DDF] shadow-[0_0_12px_#FF4DDF]" />
            Analytics
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            Growth Trends
          </h3>
          <p className="mt-1 text-sm text-[#94A3B8]">
            New users, workspaces, and paid subscriptions
          </p>
        </div>

        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur md:block">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#667085]">
            Live View
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {periodLabel}
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[340px] w-full min-h-0 min-w-0">
        <div className="pointer-events-none absolute inset-x-8 bottom-10 h-10 rounded-full bg-[#FF4DDF]/25 blur-2xl" />
        <div className="pointer-events-none absolute inset-x-12 bottom-9 h-[2px] bg-linear-to-r from-transparent via-[#FF4DDF]/80 to-transparent opacity-70" />

        {dimensions.isReady &&
          dimensions.width > 0 &&
          dimensions.height > 0 && (
            <ResponsiveContainer width={dimensions.width} height={dimensions.height} minWidth={0} minHeight={0}>
              <BarChart
                data={data}
                margin={{ top: 16, right: 8, left: -20, bottom: 8 }}
                barGap={14}
                barCategoryGap="18%"
              >
                <defs>
                  <linearGradient id="usersNeonBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity={0.95} />
                    <stop offset="55%" stopColor="#8B5CF6" stopOpacity={0.88} />
                    <stop offset="100%" stopColor="#2A133D" stopOpacity={0.35} />
                  </linearGradient>

                  <linearGradient id="workspaceNeonBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F472B6" stopOpacity={1} />
                    <stop offset="55%" stopColor="#D946EF" stopOpacity={0.92} />
                    <stop offset="100%" stopColor="#3B0D2E" stopOpacity={0.35} />
                  </linearGradient>

                  <linearGradient id="subscriptionNeonBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E9D5FF" stopOpacity={0.95} />
                    <stop offset="55%" stopColor="#A855F7" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#24103A" stopOpacity={0.3} />
                  </linearGradient>

                  <filter id="pinkGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 6"
                />

                <XAxis
                  dataKey="label"
                  stroke="#667085"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />

                <YAxis
                  stroke="#667085"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(12, 17, 29, 0.88)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "18px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                    backdropFilter: "blur(16px)",
                    color: "#FFFFFF",
                  }}
                  labelStyle={{ color: "#E2E8F0", marginBottom: "6px" }}
                  itemStyle={{ color: "#C7D7FE" }}
                />

                <Legend
                  wrapperStyle={{ paddingTop: "18px" }}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-medium text-[#94A3B8]">{value}</span>
                  )}
                />

                <Bar
                  dataKey="users"
                  name="Users"
                  fill="url(#usersNeonBar)"
                  radius={[10, 10, 4, 4]}
                  maxBarSize={28}
                  filter="url(#pinkGlow)"
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="workspaces"
                  name="Workspaces"
                  fill="url(#workspaceNeonBar)"
                  radius={[10, 10, 4, 4]}
                  maxBarSize={28}
                  filter="url(#pinkGlow)"
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="subscriptions"
                  name="Subscriptions"
                  fill="url(#subscriptionNeonBar)"
                  radius={[10, 10, 4, 4]}
                  maxBarSize={28}
                  filter="url(#pinkGlow)"
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
      </div>
    </div>
  );
};

export default GrowthTrendChart;
