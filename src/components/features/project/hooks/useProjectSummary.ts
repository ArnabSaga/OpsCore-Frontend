"use client";

import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { getProjectSummary } from "../api/project.types";

type UseProjectSummaryOptions = {
  workspaceId?: string | null;
  projectId: string;
  enabled?: boolean;
};

export const useProjectSummary = ({
  workspaceId,
  projectId,
  enabled = true,
}: UseProjectSummaryOptions) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey:
      resolvedWorkspaceId && projectId
        ? projectQueryKeys.summary(resolvedWorkspaceId, projectId)
        : [...projectQueryKeys.all, "summary", "disabled"],
    queryFn: () => getProjectSummary(resolvedWorkspaceId as string, projectId),
    enabled: enabled && !!resolvedWorkspaceId && !!projectId,
    staleTime: 1000 * 60 * 2,
  });
};
