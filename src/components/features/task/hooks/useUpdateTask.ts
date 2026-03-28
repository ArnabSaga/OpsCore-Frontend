"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { updateTask } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { UpdateTaskPayload } from "@/types/task.types";

type UseUpdateTaskOptions = {
  workspaceId?: string | null;
};

type UpdateTaskMutationInput = {
  taskId: string;
  payload: UpdateTaskPayload;
  currentProjectId?: string;
};

export const useUpdateTask = ({ workspaceId }: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, payload }: UpdateTaskMutationInput) =>
      updateTask(resolvedWorkspaceId as string, taskId, payload),

    onSuccess: async (data, variables) => {
      if (!resolvedWorkspaceId) return;

      const affectedProjectIds = Array.from(
        new Set([variables.currentProjectId, data.projectId].filter(Boolean))
      ) as string[];

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      for (const projectId of affectedProjectIds) {
        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.tasks(resolvedWorkspaceId, projectId),
          exact: false,
        });

        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.detail(resolvedWorkspaceId, projectId),
        });

        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.summary(resolvedWorkspaceId, projectId),
        });
      }

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },

    onError: (error: Error) => {
      console.error("Update task failed:", error.message);
    },
  });
};
