"use client";

import { Search, SlidersHorizontal, FilterX } from "lucide-react";
import type { PlatformInvoiceSortPreset } from "@/components/features/invoice/hooks/usePlatformInvoiceListFilters";
import type { InvoiceStatus } from "@/components/features/invoice/types/invoice.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PlatformInvoiceToolbarProps = {
  searchTerm: string;
  status: InvoiceStatus | "ALL";
  overdue: "ALL" | "true" | "false";
  sortPreset: PlatformInvoiceSortPreset;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InvoiceStatus | "ALL") => void;
  onOverdueChange: (value: "ALL" | "true" | "false") => void;
  onSortChange: (value: PlatformInvoiceSortPreset) => void;
  onClearFilters: () => void;
};

const PlatformInvoiceToolbar = ({
  searchTerm,
  status,
  overdue,
  sortPreset,
  onSearchChange,
  onStatusChange,
  onOverdueChange,
  onSortChange,
  onClearFilters,
}: PlatformInvoiceToolbarProps) => {
  const hasActiveFilters = searchTerm !== "" || status !== "ALL" || overdue !== "ALL";

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#94A3B8] opacity-60" />
            <Input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by invoice #, customer, or workspace name..."
              className="h-12 rounded-[18px] border-white/10 bg-white/5 pl-12 text-sm text-white placeholder:text-[#667085] focus-visible:ring-purple-500/50 transition-all focus:bg-white/8"
            />
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden h-12 items-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 text-[#94A3B8] sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sort By</span>
             </div>
            <Select
              value={sortPreset}
              onValueChange={(value) => onSortChange(value as PlatformInvoiceSortPreset)}
            >
              <SelectTrigger className="h-12 min-w-[200px] rounded-[18px] border-white/10 bg-white/5 text-sm text-white hover:bg-white/8 transition-colors">
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0B0F1A] text-white">
                <SelectItem value="created-desc">Newest first</SelectItem>
                <SelectItem value="created-asc">Oldest first</SelectItem>
                <SelectItem value="due-asc">Due soonest</SelectItem>
                <SelectItem value="due-desc">Due latest</SelectItem>
                <SelectItem value="amount-desc">Highest amount</SelectItem>
                <SelectItem value="amount-asc">Lowest amount</SelectItem>
                <SelectItem value="invoice-number-asc">Invoice # (A-Z)</SelectItem>
                <SelectItem value="status-asc">Status (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid flex-1 gap-3 sm:grid-cols-4">
            <Select
              value={status}
              onValueChange={(value) => onStatusChange(value as InvoiceStatus | "ALL")}
            >
              <SelectTrigger className="h-11 rounded-2xl border-white/10 bg-black/20 text-sm text-white hover:bg-black/30 transition-colors">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0B0F1A] text-white">
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
                <SelectItem value="CANCELED">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={overdue}
              onValueChange={(value) => onOverdueChange(value as "ALL" | "true" | "false")}
            >
              <SelectTrigger className="h-11 rounded-2xl border-white/10 bg-black/20 text-sm text-white hover:bg-black/30 transition-colors">
                <SelectValue placeholder="Overdue" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0B0F1A] text-white">
                <SelectItem value="ALL">Timeline: All</SelectItem>
                <SelectItem value="true">Overdue only</SelectItem>
                <SelectItem value="false">On time</SelectItem>
              </SelectContent>
            </Select>

            <div className="sm:hidden lg:block lg:invisible" /> 

            <Button
              type="button"
              variant="outline"
              disabled={!hasActiveFilters}
              onClick={onClearFilters}
              className="h-11 rounded-2xl border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
            >
              <FilterX className="mr-2 h-3.5 w-3.5" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInvoiceToolbar;
