"use client";

import { useMutation } from "@tanstack/react-query";

import { createCustomerPortalSession } from "@/components/features/billing/api/billing.api";
import type { CreateCustomerPortalPayload } from "@/components/features/billing/types/billing.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseCustomerPortalOptions = {
  workspaceId?: string | null;
};

export const useCustomerPortal = ({ workspaceId }: UseCustomerPortalOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: async (payload?: CreateCustomerPortalPayload) => {
      if (!resolvedWorkspaceId) {
        throw new Error("No active workspace selected.");
      }

      const response = await createCustomerPortalSession(resolvedWorkspaceId, payload);
      return response.data;
    },
  });
};
