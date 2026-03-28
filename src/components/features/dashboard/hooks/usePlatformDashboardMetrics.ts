"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformDashboardMetrics } from "@/components/features/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import type { PlatformMetricsPeriod } from "@/types/dashboard.types";

export const usePlatformDashboardMetrics = (period: PlatformMetricsPeriod = "last_30_days") => {
  return useQuery({
    queryKey: dashboardQueryKeys.platformMetrics(period),
    queryFn: () => getPlatformDashboardMetrics(period),
    staleTime: 5 * 60 * 1000,
  });
};
