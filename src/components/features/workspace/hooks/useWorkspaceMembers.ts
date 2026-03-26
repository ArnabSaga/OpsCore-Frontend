"use client";

import { getWorkspaceMembers } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceMember } from "@/types/workspace.types";
import { useQuery } from "@tanstack/react-query";

type QueryError = Error & { status?: number };

export const useWorkspaceMembers = (workspaceId: string) => {
  const query = useQuery<WorkspaceMember[], QueryError>({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
    enabled: !!workspaceId,
    retry: (failureCount, error) => {
      if (error?.status === 401 || error?.status === 403) return false;
      return failureCount < 2;
    },
  });

  const isForbidden = query.error?.status === 403;
  const isUnauthorized = query.error?.status === 401;
  const canViewMembers = !isForbidden && !isUnauthorized;

  return {
    ...query,
    members: query.data ?? [],
    canViewMembers,
    isForbidden,
    isUnauthorized,
    isPermissionError: isForbidden || isUnauthorized,
  };
};
