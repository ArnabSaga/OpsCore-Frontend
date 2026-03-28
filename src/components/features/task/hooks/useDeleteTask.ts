"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseDeleteTaskOptions = {
  workspaceId?: string | null;
  projectId?: string;
};

export const useDeleteTask = ({ workspaceId }: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId }: { taskId: string; projectId?: string }) =>
      deleteTask(resolvedWorkspaceId as string, taskId),
    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },
    onError: (error: Error) => {
      console.error("Delete task failed:", error.message);
    },
  });
};
