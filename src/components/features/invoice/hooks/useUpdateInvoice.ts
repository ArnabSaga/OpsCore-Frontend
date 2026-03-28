"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateInvoice } from "@/components/features/invoice/api/invoice.api";
import { invoiceQueryKeys } from "@/components/features/invoice/hooks/invoice.query-keys";
import type { UpdateInvoicePayload } from "@/components/features/invoice/types/invoice.types";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseUpdateInvoiceOptions = {
  workspaceId?: string | null;
};

type UpdateInvoiceMutationInput = {
  invoiceId: string;
  payload: UpdateInvoicePayload;
};

export const useUpdateInvoice = ({ workspaceId }: UseUpdateInvoiceOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ invoiceId, payload: values }: UpdateInvoiceMutationInput) => {
      const payload = {
        ...values,
        currency: values.currency?.trim().toUpperCase() || undefined,
      };
      return updateInvoice(resolvedWorkspaceId as string, invoiceId, payload);
    },

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
      console.error("Update invoice failed:", error.message);
    },
  });
};
