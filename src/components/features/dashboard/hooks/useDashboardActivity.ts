"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardActivity,
  type IWorkspaceDashboardActivityQuery,
} from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";

export const useDashboardActivity = (query: IWorkspaceDashboardActivityQuery = {}) => {
  const { activeWorkspaceId, hasServerWorkspaceContext } = useWorkspaceContext();

  return useQuery({
    queryKey: dashboardQueryKeys.activity(query, activeWorkspaceId),
    queryFn: () => getDashboardActivity(query, activeWorkspaceId),
    enabled: hasServerWorkspaceContext && !!activeWorkspaceId,
    staleTime: 2 * 60 * 1000,
  });
};
