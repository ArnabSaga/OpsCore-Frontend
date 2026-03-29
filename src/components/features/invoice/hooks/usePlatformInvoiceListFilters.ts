"use client";

import { useMemo, useState } from "react";
import type {
  GetPlatformInvoicesParams,
  InvoiceStatus,
} from "@/components/features/invoice/types/invoice.types";

export type PlatformInvoiceSortPreset =
  | "created-desc"
  | "created-asc"
  | "due-asc"
  | "due-desc"
  | "amount-desc"
  | "amount-asc"
  | "invoice-number-asc"
  | "status-asc";

const getSortConfig = (
  preset: PlatformInvoiceSortPreset
): Pick<GetPlatformInvoicesParams, "sortBy" | "sortOrder"> => {
  switch (preset) {
    case "created-asc":
      return { sortBy: "createdAt", sortOrder: "asc" };
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
    case "status-asc":
      return { sortBy: "status", sortOrder: "asc" };
    case "created-desc":
    default:
      return { sortBy: "createdAt", sortOrder: "desc" };
  }
};

export const usePlatformInvoiceListFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<InvoiceStatus | "ALL">("ALL");
  const [overdue, setOverdue] = useState<"ALL" | "true" | "false">("ALL");
  const [workspaceId, setWorkspaceId] = useState("");
  const [sortPreset, setSortPreset] = useState<PlatformInvoiceSortPreset>("created-desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const params = useMemo<GetPlatformInvoicesParams>(() => {
    const sort = getSortConfig(sortPreset);

    return {
      searchTerm: searchTerm.trim() || undefined,
      status: status === "ALL" ? undefined : status,
      overdue: overdue === "ALL" ? undefined : overdue === "true",
      workspaceId: workspaceId.trim() || undefined,
      page,
      limit,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    };
  }, [searchTerm, status, overdue, workspaceId, sortPreset, page, limit]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatus("ALL");
    setOverdue("ALL");
    setWorkspaceId("");
    setSortPreset("created-desc");
    setPage(1);
  };

  return {
    searchTerm,
    status,
    overdue,
    workspaceId,
    sortPreset,
    page,
    limit,
    params,
    setSearchTerm,
    setStatus,
    setOverdue,
    setWorkspaceId,
    setSortPreset,
    setPage,
    resetFilters,
  };
};
