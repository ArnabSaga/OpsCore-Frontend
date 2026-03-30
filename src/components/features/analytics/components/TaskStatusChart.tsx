"use client";

import { useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import type { TasksAnalyticsBreakdown } from "@/components/features/analytics/types/analytics.types";

type TaskStatusChartProps = {
  tasks: TasksAnalyticsBreakdown;
};

const TaskStatusChart = ({ tasks }: TaskStatusChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useContainerDimensions(chartContainerRef);

  const data = [
    { name: "Todo", value: tasks.todo },
    { name: "In Progress", value: tasks.inProgress },
    { name: "Review", value: tasks.review },
    { name: "Done", value: tasks.done },
    { name: "Overdue", value: tasks.overdue },
  ];

  return (
    <AnalyticsSectionCard
      title="Task pipeline"
      description="Task progression and execution load across workflow states."
      className="h-[360px]"
    >
      <div ref={chartContainerRef} className="h-[260px] min-w-0">
        {dimensions.isReady && dimensions.width > 0 && dimensions.height > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="value" fill="#7F56D9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </AnalyticsSectionCard>
  );
};

export default TaskStatusChart;
