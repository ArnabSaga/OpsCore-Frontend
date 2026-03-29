"use client";

import { LayoutGrid, Search, TableProperties } from "lucide-react";

import type {
  InvoiceSortPreset,
  InvoiceViewMode,
} from "@/components/features/invoice/hooks/useInvoiceListFilters";
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
import { cn } from "@/lib/utils";

type InvoiceToolbarProps = {
  searchTerm: string;
  status: InvoiceStatus | "ALL";
  overdue: "ALL" | "true" | "false";
  issued: "ALL" | "true" | "false";
  sortPreset: InvoiceSortPreset;
  viewMode: InvoiceViewMode;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InvoiceStatus | "ALL") => void;
  onOverdueChange: (value: "ALL" | "true" | "false") => void;
  onIssuedChange: (value: "ALL" | "true" | "false") => void;
  onSortChange: (value: InvoiceSortPreset) => void;
  onViewModeChange: (value: InvoiceViewMode) => void;
  onClearFilters: () => void;
};

const InvoiceToolbar = ({
  searchTerm,
  status,
  overdue,
  issued,
  sortPreset,
  viewMode,
  onSearchChange,
  onStatusChange,
  onOverdueChange,
  onIssuedChange,
  onSortChange,
  onViewModeChange,
  onClearFilters,
}: InvoiceToolbarProps) => {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by invoice number, customer, or notes"
              className="h-11 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-[#667085] focus-visible:ring-[#7F56D9]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={sortPreset}
              onValueChange={(value) => onSortChange(value as InvoiceSortPreset)}
            >
              <SelectTrigger className="h-11 min-w-[180px] rounded-xl border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="Sort invoices" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#101828] text-white">
                <SelectItem value="created-desc">Newest first</SelectItem>
                <SelectItem value="created-asc">Oldest first</SelectItem>
                <SelectItem value="due-asc">Due soonest</SelectItem>
                <SelectItem value="due-desc">Due latest</SelectItem>
                <SelectItem value="amount-desc">Highest amount</SelectItem>
                <SelectItem value="amount-asc">Lowest amount</SelectItem>
                <SelectItem value="invoice-number-asc">Invoice A → Z</SelectItem>
                <SelectItem value="status-asc">Status A → Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm transition",
                  viewMode === "grid"
                    ? "bg-[#7F56D9] text-white"
                    : "text-[#94A3B8] hover:text-white"
                )}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
              </button>

              <button
                type="button"
                onClick={() => onViewModeChange("table")}
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm transition",
                  viewMode === "table"
                    ? "bg-[#7F56D9] text-white"
                    : "text-[#94A3B8] hover:text-white"
                )}
              >
                <TableProperties className="mr-2 h-4 w-4" />
                Table
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <Select
            value={status}
            onValueChange={(value) => onStatusChange(value as InvoiceStatus | "ALL")}
          >
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All status</SelectItem>
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
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Overdue" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All overdue</SelectItem>
              <SelectItem value="true">Overdue only</SelectItem>
              <SelectItem value="false">Not overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={issued}
            onValueChange={(value) => onIssuedChange(value as "ALL" | "true" | "false")}
          >
            <SelectTrigger className="h-11 rounded-xl border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Issued" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#101828] text-white">
              <SelectItem value="ALL">All issue states</SelectItem>
              <SelectItem value="true">Issued</SelectItem>
              <SelectItem value="false">Draft / not issued</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Clear filters
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvoiceToolbar;
