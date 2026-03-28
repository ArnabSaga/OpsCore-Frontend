"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendInvoice } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseSendInvoiceOptions = {
  workspaceId?: string | null;
};

type SendInvoiceMutationInput = {
  invoiceId: string;
};

export const useSendInvoice = ({ workspaceId }: UseSendInvoiceOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ invoiceId }: SendInvoiceMutationInput) =>
      sendInvoice(resolvedWorkspaceId as string, invoiceId),

    onSuccess: async (updatedInvoice, variables) => {
      if (!resolvedWorkspaceId) return;

      queryClient.setQueryData(
        invoiceQueryKeys.detail(resolvedWorkspaceId, variables.invoiceId),
        updatedInvoice
      );

      await queryClient.invalidateQueries({
        queryKey: invoiceQueryKeys.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.all,
      });
    },

    onError: (error: Error) => {
      console.error("Send invoice failed:", error.message);
    },
  });
};
