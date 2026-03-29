"use client";

import { useMutation } from "@tanstack/react-query";

import { prepareCheckoutSession } from "@/components/features/billing/api/billing.api";
import type { PrepareCheckoutPayload } from "@/components/features/billing/types/billing.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UsePrepareCheckoutOptions = {
  workspaceId?: string | null;
};

export const usePrepareCheckout = ({ workspaceId }: UsePrepareCheckoutOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: async (payload: PrepareCheckoutPayload) => {
      if (!resolvedWorkspaceId) {
        throw new Error("No active workspace selected.");
      }

      const response = await prepareCheckoutSession(resolvedWorkspaceId, payload);
      return response.data;
    },
  });
};
