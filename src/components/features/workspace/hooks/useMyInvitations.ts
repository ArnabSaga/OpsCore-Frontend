"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyInvitations } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useMyInvitations = () => {
  return useQuery({
    queryKey: workspaceQueryKeys.myInvitations(),
    queryFn: getMyInvitations,
    staleTime: 60 * 1000,
    retry: false,
  });
};
