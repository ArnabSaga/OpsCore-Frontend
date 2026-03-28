"use client";

import { useQuery } from "@tanstack/react-query";

import { getTasks } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { GetTasksParams } from "@/types/task.types";

type UseTasksOptions = {
  workspaceId?: string | null;
  params?: GetTasksParams;
  enabled?: boolean;
};

export const useTasks = ({ workspaceId, params, enabled = true }: UseTasksOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? taskQueryKeys.list(resolvedWorkspaceId, params)
      : [...taskQueryKeys.lists(), "no-workspace"],
    queryFn: () => getTasks(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60 * 2,
  });
};
