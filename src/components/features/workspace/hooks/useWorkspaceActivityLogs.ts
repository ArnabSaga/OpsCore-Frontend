"use client";

import { getWorkspaceActivityLogs } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

type Params = {
  page?: number;
  limit?: number;
};

export const useWorkspaceActivityLogs = (workspaceId: string, params?: Params) => {
  return useQuery({
    queryKey: ["workspace-activity-logs", workspaceId, params?.page ?? 1, params?.limit ?? 20],
    queryFn: () => getWorkspaceActivityLogs(workspaceId, params),
    enabled: !!workspaceId,
  });
};
