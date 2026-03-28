"use client";

import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { getProjectMembers } from "../api/project.api";

type UseProjectMembersOptions = {
  workspaceId?: string | null;
  projectId: string;
  enabled?: boolean;
};

export const useProjectMembers = ({
  workspaceId,
  projectId,
  enabled = true,
}: UseProjectMembersOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && projectId
        ? projectQueryKeys.members(resolvedWorkspaceId, projectId)
        : [...projectQueryKeys.all, "members", "disabled"],
    queryFn: () => getProjectMembers(resolvedWorkspaceId as string, projectId),
    enabled: enabled && !!resolvedWorkspaceId && !!projectId,
    staleTime: 1000 * 60 * 3,
  });
};
