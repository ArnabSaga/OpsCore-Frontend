"use client";

import { useMemo, useState } from "react";

import type { GetProjectsParams, ProjectStatus } from "@/types/project.types";

export type ProjectViewMode = "grid" | "table";
export type ProjectArchivedFilter = "false" | "true";

export type ProjectSortPreset =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "updated-desc"
  | "updated-asc";

const getSortConfig = (
  preset: ProjectSortPreset
): Pick<GetProjectsParams, "sortBy" | "sortOrder"> => {
  switch (preset) {
    case "oldest":
      return { sortBy: "createdAt", sortOrder: "asc" };
    case "name-asc":
      return { sortBy: "name", sortOrder: "asc" };
    case "name-desc":
      return { sortBy: "name", sortOrder: "desc" };
    case "updated-desc":
      return { sortBy: "updatedAt", sortOrder: "desc" };
    case "updated-asc":
      return { sortBy: "updatedAt", sortOrder: "asc" };
    case "newest":
    default:
      return { sortBy: "createdAt", sortOrder: "desc" };
  }
};

export const useProjectListFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "ALL">("ALL");
  const [archived, setArchived] = useState<ProjectArchivedFilter>("false");
  const [sortPreset, setSortPreset] = useState<ProjectSortPreset>("newest");
  const [viewMode, setViewMode] = useState<ProjectViewMode>("grid");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const params = useMemo<GetProjectsParams>(() => {
    const sort = getSortConfig(sortPreset);

    return {
      searchTerm: searchTerm.trim() || undefined,
      status: status === "ALL" ? undefined : status,
      archived: archived === "true",
      page,
      limit,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    };
  }, [searchTerm, status, archived, sortPreset, page, limit]);

  const updateSearchTerm = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  const updateStatus = (value: ProjectStatus | "ALL") => {
    setPage(1);
    setStatus(value);
  };

  const updateArchived = (value: ProjectArchivedFilter) => {
    setPage(1);
    setArchived(value);
  };

  const updateSortPreset = (value: ProjectSortPreset) => {
    setPage(1);
    setSortPreset(value);
  };

  const clearFilters = () => {
    setPage(1);
    setSearchTerm("");
    setStatus("ALL");
    setArchived("false");
    setSortPreset("newest");
  };

  return {
    searchTerm,
    status,
    archived,
    sortPreset,
    viewMode,
    page,
    limit,
    params,

    setPage,
    setLimit,
    setViewMode,

    updateSearchTerm,
    updateStatus,
    updateArchived,
    updateSortPreset,
    clearFilters,
  };
};
