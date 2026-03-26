"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

export const useDashboardOverview = () => {
  const { isResolved, isSwitching, activeWorkspaceId } = useWorkspaceContext();

  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
    staleTime: 1000 * 60 * 2,
    enabled: isResolved && !isSwitching && !!activeWorkspaceId,
  });
};
