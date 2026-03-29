"use client";

import { useQuery } from "@tanstack/react-query";

import { getActivityLogs } from "@/components/features/activity-log/api/activity-log.api";
import { activityLogQueryKeys } from "@/components/features/activity-log/hooks/activity-log.query-keys";
import type { GetActivityLogsParams } from "@/components/features/activity-log/types/activity-log.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseActivityLogsOptions = {
  workspaceId?: string | null;
  params?: GetActivityLogsParams;
  enabled?: boolean;
};

export const useActivityLogs = ({
  workspaceId,
  params,
  enabled = true,
}: UseActivityLogsOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? activityLogQueryKeys.list(resolvedWorkspaceId, params)
      : [...activityLogQueryKeys.lists(), "no-workspace"],
    queryFn: () => getActivityLogs(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 30,
  });
};
