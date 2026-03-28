"use client";

import { getInvoicePdf } from "@/components/features/invoice/api/invoice.api";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { useMutation } from "@tanstack/react-query";

type UseInvoicePdfOptions = {
  workspaceId?: string | null;
};

type GetInvoicePdfInput = {
  invoiceId: string;
};

export const useInvoicePdf = ({ workspaceId }: UseInvoicePdfOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: async ({ invoiceId }: GetInvoicePdfInput) => {
      return getInvoicePdf(resolvedWorkspaceId as string, invoiceId);
    },
  });
};
