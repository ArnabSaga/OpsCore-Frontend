"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import PlatformInvoiceHero from "@/components/features/invoice/components/PlatformInvoiceHero";
import PlatformInvoiceTable from "@/components/features/invoice/components/PlatformInvoiceTable";
import PlatformInvoiceToolbar from "@/components/features/invoice/components/PlatformInvoiceToolbar";
import PlatformInvoiceEmptyState from "@/components/features/invoice/components/PlatformInvoiceEmptyState";
import PlatformInvoiceListSkeleton from "@/components/features/invoice/components/PlatformInvoiceListSkeleton";
import { usePlatformInvoices } from "@/components/features/invoice/hooks/usePlatformInvoices";
import { usePlatformInvoiceListFilters } from "@/components/features/invoice/hooks/usePlatformInvoiceListFilters";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


const PlatformInvoiceListPageContent = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  
  const {
    searchTerm,
    status,
    overdue,
    sortPreset,
    params,
    setSearchTerm,
    setStatus,
    setOverdue,
    setSortPreset,
    setPage,
    resetFilters,
  } = usePlatformInvoiceListFilters();



  const { data, isLoading, isError, isFetching, refetch } = usePlatformInvoices({ params });

  const meta = data?.meta;

  useEffect(() => {

    if (!rootRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pi-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (isError) {
    return (
      <div className="py-10">
        <ProtectedPageErrorState
          title="Unable to load platform invoices"
          description="We encountered a problem while fetching the cross-workspace invoice oversight data."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const stats = data?.stats ?? {
    totalInvoices: 0,
    activeWorkspaces: 0,
    overdueInvoices: 0,
    overdueAmount: "$0.00",
    paidAmount: "$0.00",
    pendingAmount: "$0.00",
  };

  return (
    <div ref={rootRef} className="space-y-8 pb-12">
      <div className="pi-section">
        <PlatformInvoiceHero stats={stats} />
      </div>

      <div className="pi-section">
        <PlatformInvoiceToolbar
          searchTerm={searchTerm}
          status={status}
          overdue={overdue}
          sortPreset={sortPreset}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatus}
          onOverdueChange={setOverdue}
          onSortChange={setSortPreset}
          onClearFilters={resetFilters}
        />
      </div>

      <div className="pi-section relative">
        {/* Subtle fetching indicator */}
        {isFetching && !isLoading && (
          <div className="absolute -top-4 right-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
            Updating Oversight...
          </div>
        )}

        {isLoading ? (
          <PlatformInvoiceListSkeleton />
        ) : data?.data.length === 0 ? (
          <PlatformInvoiceEmptyState onReset={resetFilters} />
        ) : (
          <div className="space-y-8">
            <PlatformInvoiceTable invoices={data?.data ?? []} />
            
            {meta && meta.totalPages > 1 && (
              <div className="flex flex-col gap-4 rounded-[28px] border border-white/5 bg-white/2 p-5 text-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs font-medium tracking-wide text-[#94A3B8]">
                  Showing oversight page <span className="font-bold text-white">{meta.page}</span> of{" "}
                  <span className="font-bold text-white">{meta.totalPages}</span>
                  {" • "}
                  <span className="font-bold text-white">{meta.total}</span> records total
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={meta.page <= 1}
                    onClick={() => setPage(Math.max(meta.page - 1, 1))}
                    className="h-9 w-9 rounded-xl border border-white/5 bg-white/5 p-0 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex h-9 min-w-[36px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-[13px] font-bold">
                    {meta.page}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => setPage(meta.page + 1)}
                    className="h-9 w-9 rounded-xl border border-white/5 bg-white/5 p-0 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}



          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformInvoiceListPageContent;
