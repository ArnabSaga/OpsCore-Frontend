"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";

type CustomerPortalResponse = {
  success?: boolean;
  message?: string;
  data?: {
    url: string;
  };
  url?: string;
};

export const useCustomerPortal = () => {
  return useMutation({
    mutationFn: async () => {
      const response = (await apiFetch({
        endpoint: "/api/v1/billing/customer-portal",
        method: "POST",
        body: {
          returnUrl: typeof window !== "undefined" ? window.location.href : undefined,
        },
      })) as CustomerPortalResponse;

      return {
        url: response?.data?.url ?? response?.url ?? "",
      };
    },
  });
};
