"use client";

import { useParams } from "next/navigation";

import { useInvoiceDetails } from "@/components/features/invoice/hooks/useInvoiceDetails";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

export const useInvoiceRouteContext = () => {
  const params = useParams<{ invoiceId?: string }>();
  const invoiceId = params?.invoiceId ?? null;

  const { activeWorkspaceId, activeWorkspace } = useWorkspaceContext();

  const invoiceQuery = useInvoiceDetails({
    invoiceId: invoiceId ?? "",
    enabled: !!invoiceId,
  });

  const currentInvoice = invoiceQuery.data ?? null;
  const role = activeWorkspace?.role;
  const isOwnerOrAdmin = role === "OWNER" || role === "ADMIN";

  const actions = currentInvoice?.actions;
  const canEditInvoice = !!actions?.canEdit;
  const canDeleteInvoice = !!actions?.canDelete;
  const canSendInvoice = !!actions?.canSend;
  const canMarkPaidInvoice = !!actions?.canMarkPaid;
  const canCancelInvoice = !!actions?.canCancel;
  const canPreviewPdfInvoice = !!actions?.canPreviewPdf;

  return {
    invoiceId,
    workspaceId: activeWorkspaceId,
    currentInvoice,
    isLoading: invoiceQuery.isLoading,
    isError: invoiceQuery.isError,
    role,
    isOwnerOrAdmin,
    canEditInvoice,
    canDeleteInvoice,
    canSendInvoice,
    canMarkPaidInvoice,
    canCancelInvoice,
    canPreviewPdfInvoice,
  };
};
