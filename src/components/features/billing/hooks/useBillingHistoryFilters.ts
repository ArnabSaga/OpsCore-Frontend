"use client";

import { useMemo, useState } from "react";

import type { GetBillingHistoryParams } from "@/components/features/billing/types/billing.types";

export const useBillingHistoryFilters = () => {
  const [limit, setLimit] = useState(10);
  const [startingAfter, setStartingAfter] = useState("");

  const params = useMemo<GetBillingHistoryParams>(() => {
    return {
      limit,
      startingAfter: startingAfter.trim() || undefined,
    };
  }, [limit, startingAfter]);

  const resetFilters = () => {
    setLimit(10);
    setStartingAfter("");
  };

  const applyLimit = (value: number) => {
    const normalized = Number.isFinite(value) ? Math.min(Math.max(value, 1), 100) : 10;
    setLimit(normalized);
  };

  const applyStartingAfter = (value: string) => {
    setStartingAfter(value);
  };

  return {
    limit,
    startingAfter,
    params,
    setLimit: applyLimit,
    setStartingAfter: applyStartingAfter,
    resetFilters,
  };
};
