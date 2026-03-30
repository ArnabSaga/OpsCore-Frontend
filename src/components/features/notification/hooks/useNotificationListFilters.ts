"use client";

import type { NotificationListParams } from "@/components/features/notification/types/notification.types";
import { useMemo, useState } from "react";

export const useNotificationListFilters = () => {
  const [status, setStatus] = useState<NotificationListParams["status"]>();
  const [channel, setChannel] = useState<NotificationListParams["channel"]>();
  const [entityType, setEntityType] = useState<NotificationListParams["entityType"]>();
  const [type, setType] = useState<NotificationListParams["type"]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<NotificationListParams["sortBy"]>("createdAt");
  const [sortOrder, setSortOrder] = useState<NotificationListParams["sortOrder"]>("desc");

  const params = useMemo<NotificationListParams>(
    () => ({
      status,
      channel,
      entityType,
      type,
      searchTerm: searchTerm.trim() || undefined,
      page,
      limit,
      sortBy,
      sortOrder,
    }),
    [status, channel, entityType, type, searchTerm, page, limit, sortBy, sortOrder]
  );

  const resetFilters = () => {
    setStatus(undefined);
    setChannel(undefined);
    setEntityType(undefined);
    setType(undefined);
    setSearchTerm("");
    setPage(1);
    setLimit(10);
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return {
    status,
    channel,
    entityType,
    type,
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    params,
    setStatus,
    setChannel,
    setEntityType,
    setType,
    setSearchTerm,
    setPage,
    setLimit,
    setSortBy,
    setSortOrder,
    resetFilters,
  };
};
