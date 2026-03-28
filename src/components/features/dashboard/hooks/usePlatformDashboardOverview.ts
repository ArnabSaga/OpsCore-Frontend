"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformDashboardOverview } from "@/components/features/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";

export const usePlatformDashboardOverview = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.platformOverview(),
    queryFn: getPlatformDashboardOverview,
    staleTime: 5 * 60 * 1000,
  });
};
