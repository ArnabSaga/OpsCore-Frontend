"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { FolderKanban } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard.types";
import { useMountedWithWidth } from "@/hooks/useMountedWithWidth";

type ProjectStatusChartProps = {
  overview: DashboardOverview;
};

const ProjectStatusChart = ({ overview }: ProjectStatusChartProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const isChartMounted = useMountedWithWidth(chartContainerRef);

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
          delay: 0.08,
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const data = [
    { name: "Active", value: overview.projects.active, color: "#7F56D9" },
    { name: "Completed", value: overview.projects.completed, color: "#12B76A" },
    { name: "On Hold", value: overview.projects.onHold, color: "#F59E0B" },
    { name: "Archived", value: overview.projects.archived, color: "#667085" },
  ];

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <FolderKanban className="h-5 w-5 text-[#CBB5FF]" />
          Project Status Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div ref={chartContainerRef} className="h-[320px] w-full min-h-0 min-w-0">
          {isChartMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={320}>
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
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
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

        <div className="mt-2 grid grid-cols-2 gap-3">
          {data.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-white/3 p-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm text-[#94A3B8]">{item.name}</p>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusChart;
