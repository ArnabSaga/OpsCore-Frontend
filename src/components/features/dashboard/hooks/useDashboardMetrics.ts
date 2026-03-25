"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "@/components/features/dashboard/api/dashboard.api";
import type { DashboardMetricsPeriod } from "@/types/dashboard.types";

export const useDashboardMetrics = (period: DashboardMetricsPeriod = "last_30_days") => {
  return useQuery({
    queryKey: ["dashboard", "metrics", period],
    queryFn: () => getDashboardMetrics(period),
    staleTime: 1000 * 60,
  });
};
