"use client";

import { useCallback, useMemo, useState } from "react";

import type { GetTasksParams, TaskPriority, TaskStatus } from "@/types/task.types";

export type TaskBoardFilters = {
  searchTerm: string;
  priority: TaskPriority | "ALL";
  assignedToUserId: string;
  assignedToMe: boolean;
  overdue: "ALL" | "true" | "false";
  projectId: string;
};

export const BOARD_COLUMNS: TaskStatus[] = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const DEFAULT_FILTERS: TaskBoardFilters = {
  searchTerm: "",
  priority: "ALL",
  assignedToUserId: "ALL",
  assignedToMe: false,
  overdue: "ALL",
  projectId: "ALL",
};

export const useTaskBoardFilters = (initial?: Partial<TaskBoardFilters>) => {
  const [filters, setFilters] = useState<TaskBoardFilters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const setFilter = useCallback(
    <K extends keyof TaskBoardFilters>(key: K, value: TaskBoardFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...initial,
    });
  }, [initial]);

  const params = useMemo<GetTasksParams>(() => {
    return {
      searchTerm: filters.searchTerm.trim() || undefined,
      priority: filters.priority === "ALL" ? undefined : filters.priority,
      assignedToUserId: filters.assignedToUserId === "ALL" ? undefined : filters.assignedToUserId,
      assignedToMe: filters.assignedToMe || undefined,
      overdue: filters.overdue === "ALL" ? undefined : filters.overdue === "true",
      projectId: filters.projectId === "ALL" ? undefined : filters.projectId,
      page: 1,
      limit: 100,
      sortBy: "updatedAt",
      sortOrder: "desc",
    };
  }, [filters]);

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.priority !== "ALL" ||
    filters.assignedToUserId !== "ALL" ||
    filters.assignedToMe !== false ||
    filters.overdue !== "ALL" ||
    filters.projectId !== "ALL";

  return {
    filters,
    params,
    setFilter,
    resetFilters,
    hasActiveFilters,
    BOARD_COLUMNS,
  };
};
