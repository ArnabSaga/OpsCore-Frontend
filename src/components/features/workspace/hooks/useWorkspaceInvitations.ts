"use client";

import { getWorkspaceInvitations } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceInvitation } from "@/types/workspace.types";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

type QueryError = Error & { status?: number };

export const useWorkspaceInvitations = (workspaceId: string) => {
  const query = useQuery<WorkspaceInvitation[], QueryError>({
    queryKey: workspaceId
      ? workspaceQueryKeys.invitations(workspaceId)
      : [...workspaceQueryKeys.all, "invitations", "disabled"],
    queryFn: () => getWorkspaceInvitations(workspaceId),
    enabled: !!workspaceId,
    retry: (failureCount, error) => {
      if (error?.status === 401 || error?.status === 403) return false;
      return failureCount < 2;
    },
  });

  const isForbidden = query.error?.status === 403;
  const isUnauthorized = query.error?.status === 401;
  const canViewInvitations = !isForbidden && !isUnauthorized;

  return {
    ...query,
    invitations: query.data ?? [],
    canViewInvitations,
    isForbidden,
    isUnauthorized,
    isPermissionError: isForbidden || isUnauthorized,
  };
};
