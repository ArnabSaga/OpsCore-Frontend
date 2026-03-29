"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import InvoiceCard from "@/components/features/invoice/components/InvoiceCard";
import InvoiceEmptyState from "@/components/features/invoice/components/InvoiceEmptyState";
import InvoiceListHero from "@/components/features/invoice/components/InvoiceListHero";
import InvoiceListSkeleton from "@/components/features/invoice/components/InvoiceListSkeleton";
import InvoiceTable from "@/components/features/invoice/components/InvoiceTable";
import InvoiceToolbar from "@/components/features/invoice/components/InvoiceToolbar";
import { useDeleteInvoice } from "@/components/features/invoice/hooks/useDeleteInvoice";
import { useInvoiceListFilters } from "@/components/features/invoice/hooks/useInvoiceListFilters";
import { useInvoices } from "@/components/features/invoice/hooks/useInvoices";
import {
  formatInvoiceMoney,
  getDisplayInvoiceStatus,
} from "@/components/features/invoice/utils/invoice-display";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

const InvoiceListPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspaceId } = useWorkspaceContext();

  const {
    searchTerm,
    status,
    overdue,
    issued,
    sortPreset,
    viewMode,
    page,
    limit,
    params,
    setSearchTerm,
    setStatus,
    setOverdue,
    setIssued,
    setSortPreset,
    setViewMode,
    setPage,
    resetFilters,
  } = useInvoiceListFilters();

  const { data, isLoading, isError, refetch, isFetching } = useInvoices({
    params,
    enabled: !!activeWorkspaceId,
  });

  const { mutateAsync: deleteInvoice } = useDeleteInvoice({ redirectTo: null });

  const invoices = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-invoice-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-invoice-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-invoice-card]",
        { opacity: 0, y: 20, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.05,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, invoices.length, viewMode, page]);

  const heroStats = useMemo(() => {
    const totalInvoices = meta?.total ?? invoices.length;
    const pendingInvoices = invoices.filter(
      (invoice) => getDisplayInvoiceStatus(invoice) === "PENDING"
    ).length;
    const paidInvoices = invoices.filter(
      (invoice) => getDisplayInvoiceStatus(invoice) === "PAID"
    ).length;

    const totalVolumeNumber = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.amount || 0),
      0
    );
    const firstCurrency = invoices[0]?.currency ?? "USD";

    return {
      totalInvoices,
      pendingInvoices,
      paidInvoices,
      totalVolume: formatInvoiceMoney(totalVolumeNumber, firstCurrency),
    };
  }, [invoices, meta?.total]);

  if (isLoading) {
    return <InvoiceListSkeleton />;
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invoices"
        description="We couldn't fetch your invoices right now. Please try again."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <InvoiceListHero
        totalInvoices={heroStats.totalInvoices}
        pendingInvoices={heroStats.pendingInvoices}
        paidInvoices={heroStats.paidInvoices}
        totalVolume={heroStats.totalVolume}
      />

      <div data-invoice-toolbar>
        <InvoiceToolbar
          searchTerm={searchTerm}
          status={status}
          overdue={overdue}
          issued={issued}
          sortPreset={sortPreset}
          viewMode={viewMode}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatus}
          onOverdueChange={setOverdue}
          onIssuedChange={setIssued}
          onSortChange={setSortPreset}
          onViewModeChange={setViewMode}
          onClearFilters={resetFilters}
        />
      </div>

      {invoices.length === 0 ? (
        <InvoiceEmptyState />
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onDelete={async (selectedInvoice) => {
                    await deleteInvoice({ invoiceId: selectedInvoice.id });
                  }}
                />
              ))}
            </div>
          ) : (
            <InvoiceTable
              invoices={invoices}
              onDelete={async (selectedInvoice) => {
                await deleteInvoice({ invoiceId: selectedInvoice.id });
              }}
            />
          )}

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#94A3B8]">
              Showing page <span className="font-semibold text-white">{meta?.page ?? page}</span> of{" "}
              <span className="font-semibold text-white">{meta?.totalPages ?? 1}</span>
              {typeof meta?.total === "number" ? (
                <>
                  {" "}
                  • <span className="font-semibold text-white">{meta.total}</span> invoices total
                </>
              ) : null}
              {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={(meta?.page ?? page) <= 1}
                onClick={() => setPage(Math.max(page - 1, 1))}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Previous
              </Button>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                {meta?.page ?? page} / {meta?.totalPages ?? 1}
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={
                  (meta?.page ?? page) >= (meta?.totalPages ?? 1) || invoices.length < limit
                }
                onClick={() => setPage(page + 1)}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceListPageContent;
