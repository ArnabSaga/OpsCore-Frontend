"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardActivity } from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

export const useDashboardActivity = ({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const { isResolved, isSwitching, activeWorkspaceId } = useWorkspaceContext();

  return useQuery({
    queryKey: ["dashboard", "activity", page, limit],
    queryFn: () => getDashboardActivity({ page, limit }),
    staleTime: 1000 * 60,
    enabled: isResolved && !isSwitching && !!activeWorkspaceId,
  });
};
