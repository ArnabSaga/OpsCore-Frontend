"use client";

import type { BillingUsageResponse } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  usage: BillingUsageResponse;
};

const WorkspaceUsageCards = ({ usage }: Props) => {
  return (
    <WorkspaceSectionCard
      title="Usage & limits"
      description="Track resource usage against your current workspace plan limits."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {usage.metrics.map((metric) => {
          const percentage =
            metric.limit && metric.limit > 0
              ? Math.min((metric.used / metric.limit) * 100, 100)
              : 0;

          return (
            <div
              key={metric.resource}
              className="rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">
                {metric.resource}
              </p>

              <p className="mt-3 text-2xl font-semibold text-white">
                {metric.used}
                {metric.limit !== null ? (
                  <span className="ml-1 text-sm font-medium text-[#94A3B8]">/ {metric.limit}</span>
                ) : null}
              </p>

              {metric.limit !== null ? (
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[#7F56D9]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceUsageCards;
