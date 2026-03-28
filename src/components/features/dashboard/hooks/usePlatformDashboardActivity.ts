"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformDashboardActivity } from "@/components/features/dashboard/api/dashboard.api";
import { dashboardQueryKeys } from "./dashboard.query-keys";

export const usePlatformDashboardActivity = ({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: dashboardQueryKeys.platformActivity({ page, limit }),
    queryFn: () => getPlatformDashboardActivity({ page, limit }),
    staleTime: 1000 * 30,
    retry: false,
  });
};
