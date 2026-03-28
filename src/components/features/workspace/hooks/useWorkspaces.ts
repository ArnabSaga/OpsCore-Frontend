"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: workspaceQueryKeys.list(),
    queryFn: getWorkspaces,
    staleTime: 1000 * 60 * 5,
  });
};
