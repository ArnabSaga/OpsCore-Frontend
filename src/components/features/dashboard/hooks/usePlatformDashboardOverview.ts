"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformDashboardOverview } from "@/components/features/dashboard/api/dashboard.api";

export const usePlatformDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard", "platform", "overview"],
    queryFn: getPlatformDashboardOverview,
    staleTime: 1000 * 60,
    retry: false,
  });
};
