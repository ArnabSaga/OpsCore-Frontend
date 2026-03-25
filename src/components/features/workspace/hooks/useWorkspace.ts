"use client";

import { useMemo } from "react";
import { useWorkspaces } from "./useWorkspaces";

export const useWorkspace = () => {
  const { data, isLoading, isError, error } = useWorkspaces();

  const activeWorkspace = useMemo(() => {
    return data?.activeWorkspace ?? data?.workspaces?.find((w) => w.isActive) ?? null;
  }, [data]);

  return {
    activeWorkspace,
    workspaces: data?.workspaces ?? [],
    isLoading,
    isError,
    error,
  };
};
