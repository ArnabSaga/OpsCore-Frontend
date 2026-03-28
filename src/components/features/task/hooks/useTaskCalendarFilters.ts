"use client";

import { useCallback, useMemo, useState } from "react";

import type { GetTasksParams, TaskPriority } from "@/types/task.types";

export type TaskCalendarFilters = {
  searchTerm: string;
  priority: TaskPriority | "ALL";
  assignedToUserId: string;
  assignedToMe: boolean;
  projectId: string;
};

const DEFAULT_FILTERS: TaskCalendarFilters = {
  searchTerm: "",
  priority: "ALL",
  assignedToUserId: "ALL",
  assignedToMe: false,
  projectId: "ALL",
};

export const useTaskCalendarFilters = (initial?: Partial<TaskCalendarFilters>) => {
  const [filters, setFilters] = useState<TaskCalendarFilters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const setFilter = useCallback(
    <K extends keyof TaskCalendarFilters>(key: K, value: TaskCalendarFilters[K]) => {
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

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now.toISOString().slice(0, 10));
  }, []);

  const monthStart = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
    [currentMonth]
  );

  const monthEnd = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
    [currentMonth]
  );

  const params = useMemo<GetTasksParams>(() => {
    return {
      searchTerm: filters.searchTerm.trim() || undefined,
      priority: filters.priority === "ALL" ? undefined : filters.priority,
      assignedToUserId: filters.assignedToUserId === "ALL" ? undefined : filters.assignedToUserId,
      assignedToMe: filters.assignedToMe || undefined,
      projectId: filters.projectId === "ALL" ? undefined : filters.projectId,
      dueFrom: new Date(
        monthStart.getFullYear(),
        monthStart.getMonth(),
        1,
        0,
        0,
        0,
        0
      ).toISOString(),
      dueTo: new Date(
        monthEnd.getFullYear(),
        monthEnd.getMonth(),
        monthEnd.getDate(),
        23,
        59,
        59,
        999
      ).toISOString(),
      page: 1,
      limit: 200,
      sortBy: "dueDate",
      sortOrder: "asc",
    };
  }, [filters, monthStart, monthEnd]);

  return {
    filters,
    params,
    currentMonth,
    selectedDate,
    setFilter,
    setSelectedDate,
    setCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    resetFilters,
  };
};
