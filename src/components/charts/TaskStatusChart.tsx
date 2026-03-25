"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard.types";

type TaskStatusChartProps = {
  overview: DashboardOverview;
};

const TaskStatusChart = ({ overview }: TaskStatusChartProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

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
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const data = [
    { name: "Todo", value: overview.tasks.todo, color: "#667085" },
    { name: "In Progress", value: overview.tasks.inProgress, color: "#7F56D9" },
    { name: "Review", value: overview.tasks.review, color: "#6941C6" },
    { name: "Done", value: overview.tasks.done, color: "#12B76A" },
  ];

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <CheckSquare className="h-5 w-5 text-[#CBB5FF]" />
          Task Status Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full min-h-0 min-w-0">
          {mounted && (
            <ResponsiveContainer width="100%" height={320} minWidth={0} minHeight={0} debounce={100}>
              <BarChart data={data} barCategoryGap={24}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    background: "#101828",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "16px",
                    color: "#FFFFFF",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStatusChart;
