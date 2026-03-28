"use client";

import type { GetTasksParams, TaskPriority, TaskStatus } from "@/types/task.types";
import { useMemo, useState } from "react";

export type TaskViewMode = "list" | "table";
export type TaskSortPreset =
  | "updated-desc"
  | "updated-asc"
  | "created-desc"
  | "created-asc"
  | "due-asc"
  | "due-desc"
  | "priority-desc"
  | "priority-asc";

const getSortConfig = (preset: TaskSortPreset): Pick<GetTasksParams, "sortBy" | "sortOrder"> => {
  switch (preset) {
    case "updated-asc":
      return { sortBy: "updatedAt", sortOrder: "asc" };
    case "created-desc":
      return { sortBy: "createdAt", sortOrder: "desc" };
    case "created-asc":
      return { sortBy: "createdAt", sortOrder: "asc" };
    case "due-asc":
      return { sortBy: "dueDate", sortOrder: "asc" };
    case "due-desc":
      return { sortBy: "dueDate", sortOrder: "desc" };
    case "priority-desc":
      return { sortBy: "priority", sortOrder: "desc" };
    case "priority-asc":
      return { sortBy: "priority", sortOrder: "asc" };
    case "updated-desc":
    default:
      return { sortBy: "updatedAt", sortOrder: "desc" };
  }
};

export const useProjectTaskFilters = (projectId: string) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<TaskStatus | "ALL">("ALL");
  const [priority, setPriority] = useState<TaskPriority | "ALL">("ALL");
  const [assignedToUserId, setAssignedToUserId] = useState<string>("ALL");
  const [overdue, setOverdue] = useState<"ALL" | "true" | "false">("ALL");
  const [dueFrom, setDueFrom] = useState("");
  const [dueTo, setDueTo] = useState("");
  const [sortPreset, setSortPreset] = useState<TaskSortPreset>("updated-desc");
  const [viewMode, setViewMode] = useState<TaskViewMode>("list");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = useMemo<GetTasksParams>(() => {
    const sort = getSortConfig(sortPreset);

    const toIsoDate = (value: string) =>
      value ? new Date(`${value}T00:00:00.000Z`).toISOString() : undefined;

    return {
      projectId,
      searchTerm: searchTerm.trim() || undefined,
      status: status === "ALL" ? undefined : status,
      priority: priority === "ALL" ? undefined : priority,
      assignedToUserId: assignedToUserId === "ALL" ? undefined : assignedToUserId,
      overdue: overdue === "ALL" ? undefined : overdue === "true",
      dueFrom: toIsoDate(dueFrom),
      dueTo: toIsoDate(dueTo),
      page,
      limit,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    };
  }, [
    projectId,
    searchTerm,
    status,
    priority,
    assignedToUserId,
    overdue,
    dueFrom,
    dueTo,
    page,
    limit,
    sortPreset,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatus("ALL");
    setPriority("ALL");
    setAssignedToUserId("ALL");
    setOverdue("ALL");
    setDueFrom("");
    setDueTo("");
    setSortPreset("updated-desc");
    setPage(1);
  };

  return {
    searchTerm,
    status,
    priority,
    assignedToUserId,
    overdue,
    dueFrom,
    dueTo,
    sortPreset,
    viewMode,
    page,
    limit,
    params,
    setSearchTerm,
    setStatus,
    setPriority,
    setAssignedToUserId,
    setOverdue,
    setDueFrom,
    setDueTo,
    setSortPreset,
    setViewMode,
    setPage,
    setLimit,
    resetFilters,
  };
};
