"use client";

import { useCallback, useState } from "react";

import type { TaskStatus, TaskPriority, TaskOverdueFilter, GetTasksParams } from "@/types/task.types";

export type TaskBoardFilters = {
  searchTerm: string;
  priority: TaskPriority | "";
  overdue: TaskOverdueFilter;
  assignedToUserId: string;
};

const DEFAULT_FILTERS: TaskBoardFilters = {
  searchTerm: "",
  priority: "",
  overdue: "ALL",
  assignedToUserId: "",
};

/** The board view groups tasks by status column, so status is handled separately */
const BOARD_COLUMNS: TaskStatus[] = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

/**
 * Manages filter state for the Kanban board view (/tasks/board).
 * Does NOT include a status filter since the board columns already encode status.
 */
export const useTaskBoardFilters = (initial?: Partial<TaskBoardFilters>) => {
  const [filters, setFilters] = useState<TaskBoardFilters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const setFilter = useCallback(
    <K extends keyof TaskBoardFilters>(key: K, value: TaskBoardFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, ...initial });
  }, [initial]);

  /** Derives backend-compatible params that apply across all board columns */
  const toParams = useCallback((): Omit<GetTasksParams, "status"> => {
    const params: Omit<GetTasksParams, "status"> = {};

    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.priority) params.priority = filters.priority;
    if (filters.overdue !== "ALL") params.overdue = filters.overdue === "true";
    if (filters.assignedToUserId) params.assignedToUserId = filters.assignedToUserId;

    return params;
  }, [filters]);

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.priority !== "" ||
    filters.overdue !== "ALL" ||
    filters.assignedToUserId !== "";

  return {
    filters,
    setFilter,
    resetFilters,
    toParams,
    hasActiveFilters,
    BOARD_COLUMNS,
  };
};
