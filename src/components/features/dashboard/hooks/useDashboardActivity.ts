"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardActivity,
  type IWorkspaceDashboardActivityQuery,
} from "@/components/features/dashboard/api/dashboard.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

export const useDashboardActivity = (query: IWorkspaceDashboardActivityQuery) => {
  const { activeWorkspaceId, hasServerWorkspaceContext } = useWorkspaceContext();

  return useQuery({
    queryKey: ["dashboard", "activity", query, activeWorkspaceId],
    queryFn: () => getDashboardActivity(query, activeWorkspaceId),
    enabled: hasServerWorkspaceContext && !!activeWorkspaceId,
    staleTime: 2 * 60 * 1000,
  });
};
