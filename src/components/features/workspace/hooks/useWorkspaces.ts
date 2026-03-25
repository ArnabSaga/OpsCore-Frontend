"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "@/components/features/workspace/api/workspace.api";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
    staleTime: 1000 * 60 * 5,
  });
};
