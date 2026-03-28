"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { updateTask } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { UpdateTaskPayload } from "@/types/task.types";

type UseUpdateTaskOptions = {
  workspaceId?: string | null;
};

export const useUpdateTask = ({ workspaceId }: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: UpdateTaskPayload }) =>
      updateTask(resolvedWorkspaceId as string, taskId, payload),
    onSuccess: async (data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.detail(resolvedWorkspaceId, variables.taskId),
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.tasks(resolvedWorkspaceId, data.projectId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.summary(resolvedWorkspaceId, data.projectId),
      });
    },
    onError: (error: Error) => {
      console.error("Update task failed:", error.message);
    },
  });
};
