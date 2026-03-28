"use client";

import { useQuery } from "@tanstack/react-query";

import { getTaskComments } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { GetTaskCommentsParams } from "@/types/task.types";

type UseTaskCommentsOptions = {
  workspaceId?: string | null;
  taskId: string;
  params?: GetTaskCommentsParams;
  enabled?: boolean;
};

export const useTaskComments = ({
  workspaceId,
  taskId,
  params,
  enabled = true,
}: UseTaskCommentsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && taskId
        ? taskQueryKeys.comments(resolvedWorkspaceId, taskId, params)
        : [...taskQueryKeys.all, "comments", "disabled"],
    queryFn: () => getTaskComments(resolvedWorkspaceId as string, taskId, params),
    enabled: enabled && !!resolvedWorkspaceId && !!taskId,
    staleTime: 1000 * 30,
  });
};
