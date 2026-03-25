"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { useSwitchWorkspace } from "@/components/features/workspace/hooks/useSwitchWorkspace";
import { useWorkspaces } from "@/components/features/workspace/hooks/useWorkspaces";
import { useUser } from "@/hooks/useUser";
import type { Workspace } from "@/types/workspace.types";

type WorkspaceContextValue = {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  activeWorkspaceId: string | null;
  isLoading: boolean;
  isResolved: boolean;
  isSwitching: boolean;
  switchWorkspace: (workspaceId: string) => Promise<void>;
};

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: workspaceData, isLoading: isWorkspacesLoading } = useWorkspaces();
  const { mutateAsync, isPending } = useSwitchWorkspace();

  const workspaces = useMemo(() => workspaceData?.workspaces ?? [], [workspaceData]);

  const backendActiveId =
    workspaceData?.activeWorkspace?.id ??
    user?.activeWorkspace?.id ??
    user?.activeWorkspaceId ??
    null;

  const firstWorkspaceId = workspaces[0]?.id ?? null;

  const resolvedWorkspaceId = backendActiveId || firstWorkspaceId || null;

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);

  // Sync state with resolved ID if not set (replaces useEffect for more efficient syncing)
  if (!activeWorkspaceId && resolvedWorkspaceId && !isUserLoading && !isWorkspacesLoading) {
    setActiveWorkspaceId(resolvedWorkspaceId);
  }


  const activeWorkspace = useMemo(() => {
    if (activeWorkspaceId) {
      const matched = workspaces.find((workspace) => workspace.id === activeWorkspaceId);
      if (matched) return matched;
    }

    if (resolvedWorkspaceId) {
      return workspaces.find((workspace) => workspace.id === resolvedWorkspaceId) ?? null;
    }

    return null;
  }, [activeWorkspaceId, resolvedWorkspaceId, workspaces]);

  const isResolved = useMemo(() => {
    if (isUserLoading || isWorkspacesLoading) return false;

    if (workspaces.length === 0) return true;

    return !!activeWorkspace;
  }, [isUserLoading, isWorkspacesLoading, workspaces.length, activeWorkspace]);

  const handleSwitchWorkspace = useCallback(
    async (workspaceId: string) => {
      if (!workspaceId || workspaceId === activeWorkspaceId) return;

      try {
        await mutateAsync({ workspaceId });
        setActiveWorkspaceId(workspaceId);

        // Invalidate workspaces to sync with backend state
        await queryClient.invalidateQueries({ queryKey: ["workspaces"] });

        router.refresh();
      } catch (error) {
        console.error("Failed to switch workspace:", error);
      }
    },
    [activeWorkspaceId, mutateAsync, router, queryClient]
  );

  // Debug logs to trace workspace resolution (placed after all hook definitions)
  useEffect(() => {
    console.group("🔍 Workspace Sync Debug");
    console.log("USER =>", user);
    console.log("WORKSPACE DATA =>", workspaceData);
    console.log("WORKSPACES =>", workspaces);
    console.log("RESOLVED ID =>", resolvedWorkspaceId);
    console.log("ACTIVE ID =>", activeWorkspaceId);
    console.log("ACTIVE WS =>", activeWorkspace);
    console.log("IS RESOLVED =>", isResolved);
    console.groupEnd();
  }, [user, workspaceData, workspaces, resolvedWorkspaceId, activeWorkspaceId, activeWorkspace, isResolved]);

  const value = useMemo(
    () => ({
      workspaces,
      activeWorkspace,
      activeWorkspaceId,
      isLoading: !isResolved,
      isResolved,
      isSwitching: isPending,
      switchWorkspace: handleSwitchWorkspace,
    }),
    [workspaces, activeWorkspace, activeWorkspaceId, isResolved, isPending, handleSwitchWorkspace]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};
