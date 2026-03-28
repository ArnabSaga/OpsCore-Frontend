"use client";

import { useCallback, useState } from "react";

import type { TaskSummary } from "@/types/task.types";

type DialogName = "create" | "edit" | "delete";

type TaskDialogState = {
  create: boolean;
  edit: boolean;
  delete: boolean;
  selectedTask: TaskSummary | null;
};

/**
 * Manages the open/close state of all task-related dialogs in one place.
 * Keeps a shared selectedTask so the create/edit/delete dialogs share context.
 */
export const useTaskDialogState = () => {
  const [state, setState] = useState<TaskDialogState>({
    create: false,
    edit: false,
    delete: false,
    selectedTask: null,
  });

  const openDialog = useCallback((dialog: DialogName, task?: TaskSummary) => {
    setState((prev) => ({
      ...prev,
      [dialog]: true,
      selectedTask: task ?? prev.selectedTask,
    }));
  }, []);

  const closeDialog = useCallback((dialog: DialogName) => {
    setState((prev) => ({
      ...prev,
      [dialog]: false,
      ...(dialog === "delete" || dialog === "edit" ? {} : { selectedTask: null }),
    }));
  }, []);

  const closeAllDialogs = useCallback(() => {
    setState({ create: false, edit: false, delete: false, selectedTask: null });
  }, []);

  return {
    ...state,
    openDialog,
    closeDialog,
    closeAllDialogs,
  };
};
