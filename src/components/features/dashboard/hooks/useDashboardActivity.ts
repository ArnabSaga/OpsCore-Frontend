"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardActivity } from "@/components/features/dashboard/api/dashboard.api";

export const useDashboardActivity = ({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: ["dashboard", "activity", page, limit],
    queryFn: () => getDashboardActivity({ page, limit }),
    staleTime: 1000 * 60,
  });
};
