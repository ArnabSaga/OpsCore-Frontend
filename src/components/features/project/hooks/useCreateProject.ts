"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { CreateProjectPayload } from "@/types/project.types";
import { createProject } from "../api/project.types";

type UseCreateProjectOptions = {
  workspaceId?: string | null;
};

export const useCreateProject = ({ workspaceId }: UseCreateProjectOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      createProject(resolvedWorkspaceId as string, payload),
    onSuccess: async () => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },
    onError: (error: Error) => {
      console.error("Create project failed:", error.message);
    },
  });
};
