"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { UpdateProjectPayload } from "@/types/project.types";
import { updateProject } from "../api/project.api";

type UseUpdateProjectOptions = {
  workspaceId?: string | null;
};

export const useUpdateProject = ({ workspaceId }: UseUpdateProjectOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ projectId, payload }: { projectId: string; payload: UpdateProjectPayload }) =>
      updateProject(resolvedWorkspaceId as string, projectId, payload),
    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(resolvedWorkspaceId, variables.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.summary(resolvedWorkspaceId, variables.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },
    onError: (error: Error) => {
      console.error("Update project failed:", error.message);
    },
  });
};
