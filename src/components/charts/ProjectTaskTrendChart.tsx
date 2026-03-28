"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
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
import { ActivitySquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  DashboardProjectMetricPoint,
  DashboardTaskMetricPoint,
} from "@/types/dashboard.types";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";

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
    const merged = new Map<
      string,
      {
        label: string;
        projectsCreated: number;
        projectsCompleted: number;
        tasksCreated: number;
        tasksCompleted: number;
      }
    >();

    projects.forEach((item) => {
      merged.set(item.label, {
        label: item.label,
        projectsCreated: item.created,
        projectsCompleted: item.completed,
        tasksCreated: 0,
        tasksCompleted: 0,
      });
    });

    tasks.forEach((item) => {
      const existing = merged.get(item.label);

      if (existing) {
        existing.tasksCreated = item.created;
        existing.tasksCompleted = item.completed;
      } else {
        merged.set(item.label, {
          label: item.label,
          projectsCreated: 0,
          projectsCompleted: 0,
          tasksCreated: item.created,
          tasksCompleted: item.completed,
        });
      }
    });

    return Array.from(merged.values());
  }, [projects, tasks]);

  return (
    <Card
      ref={cardRef}
      className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ActivitySquare className="h-5 w-5 text-[#CBB5FF]" />
          Project & Task Activity Trend
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div ref={chartContainerRef} className="h-[320px] w-full min-h-0 min-w-0">
          {dimensions.isReady && (
            <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="label"
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
                  contentStyle={{
                    background: "#101828",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "16px",
                    color: "#FFFFFF",
                  }}
                />
                <Legend wrapperStyle={{ color: "#94A3B8" }} />
                <Line
                  type="monotone"
                  dataKey="projectsCreated"
                  name="Projects Created"
                  stroke="#7F56D9"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="projectsCompleted"
                  name="Projects Completed"
                  stroke="#CBB5FF"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="tasksCreated"
                  name="Tasks Created"
                  stroke="#6941C6"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="tasksCompleted"
                  name="Tasks Completed"
                  stroke="#12B76A"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
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
