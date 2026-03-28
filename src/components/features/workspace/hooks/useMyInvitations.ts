"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyInvitations } from "@/components/features/workspace/api/workspace.api";

export const useMyInvitations = () => {
  return useQuery({
    queryKey: ["my-invitations"],
    queryFn: getMyInvitations,
    staleTime: 60 * 1000, // 1 minute
    retry: false,
  });
};
