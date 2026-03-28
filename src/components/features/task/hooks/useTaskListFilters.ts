"use client";

import { useCallback, useState } from "react";

import type { GetTasksParams, TaskOverdueFilter, TaskStatus, TaskPriority } from "@/types/task.types";

export type TaskListFilters = {
  searchTerm: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  overdue: TaskOverdueFilter;
  assignedToUserId: string;
  dueFrom: string;
  dueTo: string;
  sortBy: GetTasksParams["sortBy"];
  sortOrder: GetTasksParams["sortOrder"];
};

const DEFAULT_FILTERS: TaskListFilters = {
  searchTerm: "",
  status: "",
  priority: "",
  overdue: "ALL",
  assignedToUserId: "",
  dueFrom: "",
  dueTo: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

/**
 * Manages filter state for the flat /tasks list view.
 * Converts the local state into a backend-compatible GetTasksParams object.
 */
export const useTaskListFilters = (initial?: Partial<TaskListFilters>) => {
  const [filters, setFilters] = useState<TaskListFilters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const setFilter = useCallback(
    <K extends keyof TaskListFilters>(key: K, value: TaskListFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, ...initial });
  }, [initial]);

  /** Derives the backend-compatible params from current filter state */
  const toParams = useCallback((): GetTasksParams => {
    const params: GetTasksParams = {};

    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.overdue !== "ALL") params.overdue = filters.overdue === "true";
    if (filters.assignedToUserId) params.assignedToUserId = filters.assignedToUserId;
    if (filters.dueFrom) params.dueFrom = filters.dueFrom;
    if (filters.dueTo) params.dueTo = filters.dueTo;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    return params;
  }, [filters]);

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.status !== "" ||
    filters.priority !== "" ||
    filters.overdue !== "ALL" ||
    filters.assignedToUserId !== "" ||
    filters.dueFrom !== "" ||
    filters.dueTo !== "";

  return { filters, setFilter, resetFilters, toParams, hasActiveFilters };
};
