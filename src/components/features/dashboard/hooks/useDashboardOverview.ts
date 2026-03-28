"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";

export const useDashboardOverview = () => {
  const { activeWorkspaceId, hasServerWorkspaceContext } = useWorkspaceContext();

  return useQuery({
    queryKey: dashboardQueryKeys.overview(activeWorkspaceId),
    queryFn: () => getDashboardOverview(activeWorkspaceId),
    enabled: hasServerWorkspaceContext && !!activeWorkspaceId,
    staleTime: 5 * 60 * 1000,
  });
};
