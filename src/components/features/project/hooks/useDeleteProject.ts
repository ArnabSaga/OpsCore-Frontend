"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { deleteProject } from "../api/project.types";

type UseDeleteProjectOptions = {
  workspaceId?: string | null;
};

export const useDeleteProject = ({ workspaceId }: UseDeleteProjectOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(resolvedWorkspaceId as string, projectId),
    onSuccess: async (_data, projectId) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });

      await queryClient.removeQueries({
        queryKey: projectQueryKeys.detail(resolvedWorkspaceId, projectId),
      });

      await queryClient.removeQueries({
        queryKey: projectQueryKeys.members(resolvedWorkspaceId, projectId),
      });

      await queryClient.removeQueries({
        queryKey: projectQueryKeys.summary(resolvedWorkspaceId, projectId),
      });

      await queryClient.removeQueries({
        queryKey: [...projectQueryKeys.all, "tasks", resolvedWorkspaceId, projectId],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },
    onError: (error: Error) => {
      console.error("Delete project failed:", error.message);
    },
  });
};
