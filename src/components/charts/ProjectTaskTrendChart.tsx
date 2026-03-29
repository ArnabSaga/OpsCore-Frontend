"use client";

import gsap from "gsap";
import { ActivitySquare } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import type {
  DashboardProjectMetricPoint,
  DashboardTaskMetricPoint,
} from "@/types/dashboard.types";

type ProjectTaskTrendChartProps = {
  projects: DashboardProjectMetricPoint[];
  tasks: DashboardTaskMetricPoint[];
};

const ProjectTaskTrendChart = ({ projects, tasks }: ProjectTaskTrendChartProps) => {
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
          delay: 0.08,
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const chartData = useMemo(() => {
    return projects.map((p, idx) => {
      const t = tasks[idx] || { created: 0, completed: 0 };
      return {
        key: p.key,
        label: p.label,
        projectsCreated: p.created,
        projectsCompleted: p.completed,
        tasksCreated: t.created,
        tasksCompleted: t.completed,
      };
    });
  }, [projects, tasks]);

  const hasActivity = useMemo(() => {
    return chartData.some(
      (p) =>
        p.projectsCreated > 0 ||
        p.projectsCompleted > 0 ||
        p.tasksCreated > 0 ||
        p.tasksCompleted > 0
    );
  }, [chartData]);

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ActivitySquare className="h-5 w-5 text-[#7F56D9]" />
          Activity Trends
        </CardTitle>
        {!hasActivity && (
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] opacity-60">
            No recent activity
          </span>
        )}
      </CardHeader>

      <CardContent>
        <div ref={chartContainerRef} className="h-[320px] w-full min-h-0 min-w-0">
          {dimensions.isReady && dimensions.width > 0 && dimensions.height > 0 && (
            <ResponsiveContainer width={dimensions.width} height={dimensions.height} minWidth={0} minHeight={0}>
              <LineChart data={chartData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                  strokeDasharray="3 3"
                />
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
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }}
                />
                <Line
                  type="monotone"
                  dataKey="projectsCreated"
                  name="Projects"
                  stroke="#7F56D9"
                  strokeWidth={2.5}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="tasksCreated"
                  name="Tasks"
                  stroke="#12B76A"
                  strokeWidth={2.5}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="tasksCompleted"
                  name="Completed"
                  stroke="#F79009"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 0 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTaskTrendChart;
