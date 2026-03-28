"use client";

import { getWorkspaceActivityLogs } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

type Params = {
  page?: number;
  limit?: number;
};

export const useWorkspaceActivityLogs = (workspaceId: string, params?: Params) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.activityLogs(workspaceId, params)
      : [...workspaceQueryKeys.all, "activity-logs", "disabled"],
    queryFn: () => getWorkspaceActivityLogs(workspaceId, params),
    enabled: !!workspaceId,
  });
};
