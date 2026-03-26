"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { DashboardMetricsPeriod } from "@/types/dashboard.types";

export const useDashboardMetrics = (period: DashboardMetricsPeriod = "last_30_days") => {
  const { isResolved, isSwitching, activeWorkspaceId } = useWorkspaceContext();

  return useQuery({
    queryKey: ["dashboard", "metrics", period],
    queryFn: () => getDashboardMetrics(period),
    staleTime: 1000 * 60,
    enabled: isResolved && !isSwitching && !!activeWorkspaceId,
  });
};
