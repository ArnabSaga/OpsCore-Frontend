"use client";

import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { GetProjectTasksParams } from "@/types/project.types";
import { getProjectTasks } from "../api/project.types";

type UseProjectTasksOptions = {
  workspaceId?: string | null;
  projectId: string;
  params?: GetProjectTasksParams;
  enabled?: boolean;
};

export const useProjectTasks = ({
  workspaceId,
  projectId,
  params,
  enabled = true,
}: UseProjectTasksOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && projectId
        ? projectQueryKeys.tasks(resolvedWorkspaceId, projectId, params)
        : [...projectQueryKeys.all, "tasks", "disabled"],
    queryFn: () => getProjectTasks(resolvedWorkspaceId as string, projectId, params),
    enabled: enabled && !!resolvedWorkspaceId && !!projectId,
    staleTime: 1000 * 60 * 2,
  });
};
