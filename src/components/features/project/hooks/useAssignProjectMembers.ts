"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { AssignProjectMembersPayload } from "@/types/project.types";
import { assignProjectMembers } from "../api/project.types";

type UseAssignProjectMembersOptions = {
  workspaceId?: string | null;
};

export const useAssignProjectMembers = ({ workspaceId }: UseAssignProjectMembersOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: AssignProjectMembersPayload;
    }) => assignProjectMembers(resolvedWorkspaceId as string, projectId, payload),
    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.members(resolvedWorkspaceId, variables.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(resolvedWorkspaceId, variables.projectId),
      });
    },
    onError: (error: Error) => {
      console.error("Assign project members failed:", error.message);
    },
  });
};
