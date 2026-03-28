"use client";

import { useCallback, useState } from "react";

import type { TaskSummary } from "@/types/task.types";

/**
 * Manages the open/close state and selected task for the TaskDetailsDrawer.
 * Centralizes the "which task is open in the drawer" concern out of page components.
 */
export const useTaskDetailsDrawerState = () => {
  const [selectedTask, setSelectedTask] = useState<TaskSummary | null>(null);

  const openDrawer = useCallback((task: TaskSummary) => {
    setSelectedTask(task);
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedTask(null);
  }, []);

  return {
    selectedTask,
    isOpen: selectedTask !== null,
    openDrawer,
    closeDrawer,
  };
};
