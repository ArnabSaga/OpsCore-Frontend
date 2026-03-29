"use client";

import { useMemo, useState } from "react";

import type { GetRevenueAnalyticsParams } from "@/components/features/analytics/types/analytics.types";

export const useRevenueAnalyticsFilters = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currency, setCurrency] = useState("");

  const params = useMemo<GetRevenueAnalyticsParams>(() => {
    return {
      from: from.trim() || undefined,
      to: to.trim() || undefined,
      currency: currency.trim().toUpperCase() || undefined,
    };
  }, [from, to, currency]);

  const resetFilters = () => {
    setFrom("");
    setTo("");
    setCurrency("");
  };

  const applyFrom = (value: string) => {
    setFrom(value);
  };

  const applyTo = (value: string) => {
    setTo(value);
  };

  const applyCurrency = (value: string) => {
    setCurrency(value);
  };

  return {
    from,
    to,
    currency,
    params,
    setFrom: applyFrom,
    setTo: applyTo,
    setCurrency: applyCurrency,
    resetFilters,
  };
};
