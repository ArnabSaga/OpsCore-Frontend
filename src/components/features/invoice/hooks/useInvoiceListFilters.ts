"use client";

import { useMemo, useState } from "react";

import type {
  GetInvoicesParams,
  InvoiceStatus,
} from "@/components/features/invoice/types/invoice.types";

export type InvoiceViewMode = "list" | "table";
export type InvoiceSortPreset =
  | "created-desc"
  | "created-asc"
  | "updated-desc"
  | "updated-asc"
  | "due-asc"
  | "due-desc"
  | "amount-desc"
  | "amount-asc"
  | "invoice-number-asc"
  | "invoice-number-desc"
  | "status-asc"
  | "status-desc";

const getSortConfig = (
  preset: InvoiceSortPreset
): Pick<GetInvoicesParams, "sortBy" | "sortOrder"> => {
  switch (preset) {
    case "created-asc":
      return { sortBy: "createdAt", sortOrder: "asc" };
    case "updated-desc":
      return { sortBy: "updatedAt", sortOrder: "desc" };
    case "updated-asc":
      return { sortBy: "updatedAt", sortOrder: "asc" };
    case "due-asc":
      return { sortBy: "dueAt", sortOrder: "asc" };
    case "due-desc":
      return { sortBy: "dueAt", sortOrder: "desc" };
    case "amount-desc":
      return { sortBy: "amount", sortOrder: "desc" };
    case "amount-asc":
      return { sortBy: "amount", sortOrder: "asc" };
    case "invoice-number-asc":
      return { sortBy: "invoiceNumber", sortOrder: "asc" };
    case "invoice-number-desc":
      return { sortBy: "invoiceNumber", sortOrder: "desc" };
    case "status-asc":
      return { sortBy: "status", sortOrder: "asc" };
    case "status-desc":
      return { sortBy: "status", sortOrder: "desc" };
    case "created-desc":
    default:
      return { sortBy: "createdAt", sortOrder: "desc" };
  }
};

export const useInvoiceListFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<InvoiceStatus | "ALL">("ALL");
  const [overdue, setOverdue] = useState<"ALL" | "true" | "false">("ALL");
  const [issued, setIssued] = useState<"ALL" | "true" | "false">("ALL");
  const [sortPreset, setSortPreset] = useState<InvoiceSortPreset>("created-desc");
  const [viewMode, setViewMode] = useState<InvoiceViewMode>("table");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = useMemo<GetInvoicesParams>(() => {
    const sort = getSortConfig(sortPreset);

    return {
      searchTerm: searchTerm.trim() || undefined,
      status: status === "ALL" ? undefined : status,
      overdue: overdue === "ALL" ? undefined : overdue === "true",
      issued: issued === "ALL" ? undefined : issued === "true",
      page,
      limit,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    };
  }, [searchTerm, status, overdue, issued, sortPreset, page, limit]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatus("ALL");
    setOverdue("ALL");
    setIssued("ALL");
    setSortPreset("created-desc");
    setPage(1);
    setLimit(10);
  };

  return {
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
    setLimit,
    resetFilters,
  };
};
