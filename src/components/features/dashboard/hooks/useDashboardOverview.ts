"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/components/features/dashboard/api/dashboard.api";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
    staleTime: 1000 * 60 * 2,
  });
};
