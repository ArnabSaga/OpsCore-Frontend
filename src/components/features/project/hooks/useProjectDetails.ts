"use client";

import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { getProjectById } from "../api/project.types";

type UseProjectDetailsOptions = {
  workspaceId?: string | null;
  projectId: string;
  enabled?: boolean;
};

export const useProjectDetails = ({
  workspaceId,
  projectId,
  enabled = true,
}: UseProjectDetailsOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && projectId
        ? projectQueryKeys.detail(resolvedWorkspaceId, projectId)
        : [...projectQueryKeys.details(), "disabled"],
    queryFn: () => getProjectById(resolvedWorkspaceId as string, projectId),
    enabled: enabled && !!resolvedWorkspaceId && !!projectId,
  });
};
