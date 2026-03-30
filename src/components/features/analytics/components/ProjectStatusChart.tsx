"use client";

import { useRef } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import type { ProjectsStatusBreakdown } from "@/components/features/analytics/types/analytics.types";

type ProjectStatusChartProps = {
  projects: ProjectsStatusBreakdown;
};

const ProjectStatusChart = ({ projects }: ProjectStatusChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useContainerDimensions(chartContainerRef);

  const data = [
    { name: "Active", value: projects.active },
    { name: "Completed", value: projects.completed },
    { name: "On Hold", value: projects.onHold },
    { name: "Archived", value: projects.archived },
  ].filter((item) => item.value > 0);

  return (
    <AnalyticsSectionCard
      title="Project status"
      description="Distribution of project states across the workspace."
      className="h-[360px]"
    >
      <div ref={chartContainerRef} className="h-[260px] min-w-0">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">
            No project status data available.
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
                      fill={["#7F56D9", "#12B76A", "#F79009", "#667085"][index % 4]}
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

export default ProjectStatusChart;
