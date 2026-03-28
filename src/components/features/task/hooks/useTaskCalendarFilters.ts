"use client";

import { useCallback, useMemo, useState } from "react";

import type { GetTasksParams, TaskCalendarItem, TaskSummary } from "@/types/task.types";

export type TaskCalendarFilters = {
  assignedToUserId: string;
  priority: string;
};

const DEFAULT_FILTERS: TaskCalendarFilters = {
  assignedToUserId: "",
  priority: "",
};

/**
 * Manages filter state and month navigation for the calendar view (/tasks/calendar).
 * Provides helpers to derive the current ISO date range and group tasks by day.
 */
export const useTaskCalendarFilters = (initial?: Partial<TaskCalendarFilters>) => {
  const [filters, setFilters] = useState<TaskCalendarFilters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const setFilter = useCallback(
    <K extends keyof TaskCalendarFilters>(key: K, value: TaskCalendarFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, ...initial });
  }, [initial]);

  const prevMonth = useCallback(() => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  /** ISO date range for the currently displayed month */
  const monthRange = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dueFrom = new Date(year, month, 1).toISOString().slice(0, 10);
    const dueTo = new Date(year, month + 1, 0).toISOString().slice(0, 10);
    return { dueFrom, dueTo };
  }, [currentMonth]);

  /** Derives backend-compatible params for the current calendar view */
  const toParams = useCallback((): GetTasksParams => {
    const params: GetTasksParams = {
      dueFrom: monthRange.dueFrom,
      dueTo: monthRange.dueTo,
      limit: 200,
    };

    if (filters.assignedToUserId) params.assignedToUserId = filters.assignedToUserId;

    return params;
  }, [filters, monthRange]);

  /** Groups a flat task array into a map keyed by ISO date string */
  const groupByDay = useCallback((tasks: TaskSummary[]): Map<string, TaskCalendarItem[]> => {
    const map = new Map<string, TaskCalendarItem[]>();

    for (const task of tasks) {
      if (!task.dueDate) continue;
      const date = task.dueDate.slice(0, 10);
      if (!map.has(date)) map.set(date, []);
      map.get(date)!.push({ task, date });
    }

    return map;
  }, []);

  return {
    filters,
    setFilter,
    resetFilters,
    currentMonth,
    prevMonth,
    nextMonth,
    goToToday,
    monthRange,
    toParams,
    groupByDay,
  };
};
