"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformDashboardMetrics } from "@/components/features/dashboard/api/dashboard.api";
import type { PlatformMetricsPeriod } from "@/types/dashboard.types";

export const usePlatformDashboardMetrics = (
  period: PlatformMetricsPeriod = "last_30_days"
) => {
  return useQuery({
    queryKey: ["dashboard", "platform", "metrics", period],
    queryFn: () => getPlatformDashboardMetrics(period),
    staleTime: 1000 * 60,
    retry: false,
  });
};
