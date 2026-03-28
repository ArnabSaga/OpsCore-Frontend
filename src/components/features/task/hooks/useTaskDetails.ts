"use client";

import { useQuery } from "@tanstack/react-query";

import { getTaskById } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseTaskDetailsOptions = {
  workspaceId?: string | null;
  taskId: string;
  enabled?: boolean;
};

export const useTaskDetails = ({ workspaceId, taskId, enabled = true }: UseTaskDetailsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && taskId
        ? taskQueryKeys.detail(resolvedWorkspaceId, taskId)
        : [...taskQueryKeys.details(), "disabled"],
    queryFn: () => getTaskById(resolvedWorkspaceId as string, taskId),
    enabled: enabled && !!resolvedWorkspaceId && !!taskId,
    staleTime: 1000 * 30,
  });
};
