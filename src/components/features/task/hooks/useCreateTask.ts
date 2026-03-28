"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { createTask } from "@/components/features/task/api/task.api";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { CreateTaskPayload } from "@/types/task.types";

type UseCreateTaskOptions = {
  workspaceId?: string | null;
};

export const useCreateTask = ({ workspaceId }: UseCreateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(resolvedWorkspaceId as string, payload),
    onSuccess: async (data) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.tasks(resolvedWorkspaceId, data.projectId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(resolvedWorkspaceId, data.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.summary(resolvedWorkspaceId, data.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
    onError: (error: Error) => {
      console.error("Create task failed:", error.message);
    },
  });
};
