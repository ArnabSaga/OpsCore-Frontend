"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { deleteTask } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseDeleteTaskOptions = {
  workspaceId?: string | null;
};

type DeleteTaskMutationInput = {
  taskId: string;
  projectId?: string;
};

export const useDeleteTask = ({ workspaceId }: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskMutationInput) =>
      deleteTask(resolvedWorkspaceId as string, taskId),

    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });

      queryClient.removeQueries({
        queryKey: taskQueryKeys.commentsRoot(resolvedWorkspaceId, variables.taskId),
        exact: false,
      });

      queryClient.removeQueries({
        queryKey: taskQueryKeys.attachmentsRoot(resolvedWorkspaceId, variables.taskId),
        exact: false,
      });

      if (variables.projectId) {
        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.tasks(resolvedWorkspaceId, variables.projectId),
          exact: false,
        });

        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.detail(resolvedWorkspaceId, variables.projectId),
        });

        await queryClient.invalidateQueries({
          queryKey: projectQueryKeys.summary(resolvedWorkspaceId, variables.projectId),
        });
      }

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },

    onError: (error: Error) => {
      console.error("Delete task failed:", error.message);
    },
  });
};
