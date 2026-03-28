"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import type { DashboardMetricsPeriod } from "@/types/dashboard.types";

export const useDashboardMetrics = (period: DashboardMetricsPeriod = "last_30_days") => {
  const { activeWorkspaceId, hasServerWorkspaceContext } = useWorkspaceContext();

  return useQuery({
    queryKey: dashboardQueryKeys.metrics(period, activeWorkspaceId),
    queryFn: () => getDashboardMetrics(period, activeWorkspaceId),
    enabled: hasServerWorkspaceContext && !!activeWorkspaceId,
    staleTime: 5 * 60 * 1000,
  });
};
