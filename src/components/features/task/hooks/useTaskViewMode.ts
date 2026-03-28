"use client";

import { useCallback, useState } from "react";

import type { TaskViewMode } from "@/types/task.types";

/**
 * Simple state hook for persisting the active task view mode (list / table / board / calendar).
 * Optionally accepts a default mode; falls back to "list".
 */
export const useTaskViewMode = (defaultMode: TaskViewMode = "list") => {
  const [viewMode, setViewMode] = useState<TaskViewMode>(defaultMode);

  const isActive = useCallback(
    (mode: TaskViewMode) => viewMode === mode,
    [viewMode]
  );

  return { viewMode, setViewMode, isActive };
};
