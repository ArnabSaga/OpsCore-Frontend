"use client";

import { useMemo, useState } from "react";

import type { GetProjectsAnalyticsParams } from "@/components/features/analytics/types/analytics.types";

export const useProjectsAnalyticsFilters = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [limit, setLimit] = useState(5);

  const params = useMemo<GetProjectsAnalyticsParams>(() => {
    return {
      from: from.trim() || undefined,
      to: to.trim() || undefined,
      limit,
    };
  }, [from, to, limit]);

  const resetFilters = () => {
    setFrom("");
    setTo("");
    setLimit(5);
  };

  const applyFrom = (value: string) => {
    setFrom(value);
  };

  const applyTo = (value: string) => {
    setTo(value);
  };

  const applyLimit = (value: number) => {
    const normalized = Number.isFinite(value) ? Math.min(Math.max(value, 1), 20) : 5;
    setLimit(normalized);
  };

  return {
    from,
    to,
    limit,
    params,
    setFrom: applyFrom,
    setTo: applyTo,
    setLimit: applyLimit,
    resetFilters,
  };
};
