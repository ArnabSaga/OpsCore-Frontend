"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInvoice } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import type { CreateInvoicePayload } from "@/components/features/invoice/types/invoice.types";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseCreateInvoiceOptions = {
  workspaceId?: string | null;
};

export const useCreateInvoice = ({ workspaceId }: UseCreateInvoiceOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: (values: CreateInvoicePayload) => {
      const payload = {
        ...values,
        currency: values.currency?.trim().toUpperCase() || undefined,
      };
      return createInvoice(resolvedWorkspaceId as string, payload);
    },

    onSuccess: async () => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: invoiceQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },

    onError: (error: Error) => {
      console.error("Create invoice failed:", error.message);
    },
  });
};
