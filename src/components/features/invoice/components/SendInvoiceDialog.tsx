"use client";

import { useState } from "react";

import { useSendInvoice } from "@/components/features/invoice/hooks/useSendInvoice";
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

type SendInvoiceDialogProps = {
  invoice: InvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SendInvoiceDialog = ({ invoice, open, onOpenChange }: SendInvoiceDialogProps) => {
  const { mutateAsync, isPending } = useSendInvoice();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSend = async () => {
    if (!invoice) return;

    setErrorMessage(null);

    try {
      await mutateAsync({ invoiceId: invoice.id });
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send invoice.");
    }
  };

  const hasEmail = !!invoice?.customerEmail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-[#101828] text-white">
        <DialogHeader>
          <DialogTitle>Send invoice</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            This will stamp the invoice as sent and attempt email delivery when a customer email is
            available.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            <p>
              Invoice: <span className="font-medium text-white">{invoice?.invoiceNumber}</span>
            </p>
            <p className="mt-2">
              Recipient:{" "}
              <span className="font-medium text-white">
                {invoice?.customerEmail || "No customer email"}
              </span>
            </p>
          </div>

          {!hasEmail ? (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              No customer email is set. The backend will still mark the invoice as sent, but no
              email can be delivered.
            </div>
          ) : null}

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
              Close
            </Button>

            <AppSubmitButton isSubmitting={isPending} onClick={handleSend}>
              Send Invoice
            </AppSubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendInvoiceDialog;
