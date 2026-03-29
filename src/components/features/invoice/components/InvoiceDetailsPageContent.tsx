"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import CancelInvoiceDialog from "@/components/features/invoice/components/CancelInvoiceDialog";
import DeleteInvoiceDialog from "@/components/features/invoice/components/DeleteInvoiceDialog";
import InvoiceActivitySummary from "@/components/features/invoice/components/InvoiceActivitySummary";
import InvoiceDetailsHero from "@/components/features/invoice/components/InvoiceDetailsHero";
import InvoiceItemsTable from "@/components/features/invoice/components/InvoiceItemsTable";
import InvoiceMetadataCard from "@/components/features/invoice/components/InvoiceMetadataCard";
import InvoiceQuickActions from "@/components/features/invoice/components/InvoiceQuickActions";
import InvoiceSummaryCard from "@/components/features/invoice/components/InvoiceSummaryCard";
import MarkInvoicePaidDialog from "@/components/features/invoice/components/MarkInvoicePaidDialog";
import SendInvoiceDialog from "@/components/features/invoice/components/SendInvoiceDialog";
import { useInvoiceDetails } from "@/components/features/invoice/hooks/useInvoiceDetails";
import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceDetailsPageContentProps = {
  invoiceId: string;
};

const InvoiceDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-[260px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="h-[240px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
          <div className="h-[360px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        </div>
        <div className="space-y-6">
          <div className="h-[260px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
          <div className="h-[260px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        </div>
      </div>
    </div>
  );
};

const InvoiceAccessNotice = () => {
  return (
    <Card className="rounded-[24px] border border-amber-500/20 bg-amber-500/10 text-amber-100 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">Restricted access</h2>
        <p className="mt-2 text-sm leading-6">
          Invoice details are available only for owner and admin roles in the current backend.
        </p>
      </CardContent>
    </Card>
  );
};

const InvoiceDetailsPageContent = ({ invoiceId }: InvoiceDetailsPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isError, refetch } = useInvoiceDetails({ invoiceId });

  const [sendOpen, setSendOpen] = useState(false);
  const [markPaidOpen, setMarkPaidOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const invoice = data as InvoiceDetails | undefined;

  const animationKey = invoice?.id ?? null;

  useEffect(() => {
    if (!containerRef.current || isLoading || !animationKey) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-invoice-details-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-invoice-details-section]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.06,
          delay: 0.06,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, animationKey]);

  if (isLoading) {
    return <InvoiceDetailsSkeleton />;
  }

  if (isError || !invoice) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invoice"
        description="We couldn't fetch this invoice right now. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div data-invoice-details-hero>
        <InvoiceDetailsHero invoice={invoice} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div data-invoice-details-section>
            <InvoiceSummaryCard invoice={invoice} />
          </div>

          <div data-invoice-details-section>
            <InvoiceItemsTable invoice={invoice} />
          </div>

          <div data-invoice-details-section>
            <InvoiceActivitySummary invoice={invoice} />
          </div>
        </div>

        <div className="space-y-6">
          <div data-invoice-details-section>
            <InvoiceQuickActions
              invoice={invoice}
              onSend={() => setSendOpen(true)}
              onMarkPaid={() => setMarkPaidOpen(true)}
              onCancel={() => setCancelOpen(true)}
              onDelete={() => setDeleteOpen(true)}
            />
          </div>

          <div data-invoice-details-section>
            <InvoiceMetadataCard invoice={invoice} />
          </div>

          <div data-invoice-details-section>
            <InvoiceAccessNotice />
          </div>
        </div>
      </div>

      <SendInvoiceDialog invoice={invoice} open={sendOpen} onOpenChange={setSendOpen} />
      <MarkInvoicePaidDialog invoice={invoice} open={markPaidOpen} onOpenChange={setMarkPaidOpen} />
      <CancelInvoiceDialog invoice={invoice} open={cancelOpen} onOpenChange={setCancelOpen} />
      <DeleteInvoiceDialog invoice={invoice} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
};

export default InvoiceDetailsPageContent;
