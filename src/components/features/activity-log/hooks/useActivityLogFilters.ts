"use client";

import { useMemo, useState } from "react";

import type { GetActivityLogsParams } from "@/components/features/activity-log/types/activity-log.types";

export const useActivityLogFilters = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [userId, setUserId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const params = useMemo<GetActivityLogsParams>(() => {
    return {
      page,
      limit,
      action: action.trim() || undefined,
      entityType: entityType.trim() || undefined,
      userId: userId.trim() || undefined,
      from: from.trim() || undefined,
      to: to.trim() || undefined,
    };
  }, [page, limit, action, entityType, userId, from, to]);

  const resetFilters = () => {
    setPage(1);
    setLimit(10);
    setAction("");
    setEntityType("");
    setUserId("");
    setFrom("");
    setTo("");
  };

  const applyAction = (value: string) => {
    setPage(1);
    setAction(value);
  };

  const applyEntityType = (value: string) => {
    setPage(1);
    setEntityType(value);
  };

  const applyUserId = (value: string) => {
    setPage(1);
    setUserId(value);
  };

  const applyFrom = (value: string) => {
    setPage(1);
    setFrom(value);
  };

  const applyTo = (value: string) => {
    setPage(1);
    setTo(value);
  };

  const applyLimit = (value: number) => {
    setPage(1);
    setLimit(value);
  };

  return {
    page,
    limit,
    action,
    entityType,
    userId,
    from,
    to,
    params,

    setPage,
    setLimit: applyLimit,
    setAction: applyAction,
    setEntityType: applyEntityType,
    setUserId: applyUserId,
    setFrom: applyFrom,
    setTo: applyTo,
    resetFilters,
  };
};
