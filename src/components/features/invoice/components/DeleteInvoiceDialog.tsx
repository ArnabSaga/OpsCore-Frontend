"use client";

import { useState } from "react";

import { useDeleteInvoice } from "@/components/features/invoice/hooks/useDeleteInvoice";
import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteInvoiceDialogProps = {
  invoice: InvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteInvoiceDialog = ({ invoice, open, onOpenChange }: DeleteInvoiceDialogProps) => {
  const { mutateAsync, isPending } = useDeleteInvoice({ redirectTo: "/invoices" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!invoice) return;

    setErrorMessage(null);

    try {
      await mutateAsync({ invoiceId: invoice.id });
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete invoice.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Delete invoice</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Only pending or canceled invoices can be deleted by the backend.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            Invoice <span className="font-medium text-white">{invoice?.invoiceNumber}</span> will be
            removed from the active workspace view.
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Keep invoice
            </Button>

            <AppSubmitButton
              isSubmitting={isPending}
              variant="destructive"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleConfirm}
            >
              Delete Invoice
            </AppSubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInvoiceDialog;
