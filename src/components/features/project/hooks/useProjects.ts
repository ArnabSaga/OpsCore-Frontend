"use client";

import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { GetProjectsParams } from "@/types/project.types";
import { getProjects } from "../api/project.types";

type UseProjectsOptions = {
  workspaceId?: string | null;
  params?: GetProjectsParams;
  enabled?: boolean;
};

export const useProjects = ({ workspaceId, params, enabled = true }: UseProjectsOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? projectQueryKeys.list(resolvedWorkspaceId, params)
      : [...projectQueryKeys.lists(), "no-workspace"],
    queryFn: () => getProjects(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60 * 5,
  });
};
