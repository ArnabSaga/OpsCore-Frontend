"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type PrepareCheckoutPayload = {
  plan: "PRO" | "ENTERPRISE";
  billingInterval?: "month" | "year";
  successUrl?: string;
  cancelUrl?: string;
};

type PrepareCheckoutResponse = {
  success?: boolean;
  message?: string;
  data?: {
    checkoutSessionId: string;
    checkoutUrl: string;
  };
  checkoutSessionId?: string;
  checkoutUrl?: string;
};

export function usePrepareCheckout() {
  const { activeWorkspaceId } = useWorkspaceContext();

  return useMutation({
    mutationFn: async (payload: PrepareCheckoutPayload) => {
      const response = (await apiFetch({
        endpoint: "/api/v1/billing/checkout-session",
        method: "POST",
        workspaceId: activeWorkspaceId,
        body: payload,
      })) as PrepareCheckoutResponse;

      return {
        checkoutSessionId: response?.data?.checkoutSessionId ?? response?.checkoutSessionId ?? "",
        checkoutUrl: response?.data?.checkoutUrl ?? response?.checkoutUrl ?? "",
      };
    },
  });
}
