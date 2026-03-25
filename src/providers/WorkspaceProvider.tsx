"use client";

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
  isSwitching: boolean;
  switchWorkspace: (workspaceId: string) => Promise<void>;
};

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: workspaceData, isLoading: isWorkspacesLoading } = useWorkspaces();
  const { mutateAsync, isPending } = useSwitchWorkspace();

  const workspaces = useMemo(() => workspaceData?.workspaces ?? [], [workspaceData]);

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    if (isUserLoading || isWorkspacesLoading) return;

    const backendActiveId = workspaceData?.activeWorkspace?.id;
    const userActiveId = user?.activeWorkspace?.id || user?.activeWorkspaceId;
    const firstId = workspaces[0]?.id;

    const targetId = (backendActiveId || userActiveId || firstId || null) as string | null;

    if (targetId && targetId !== activeWorkspaceId) {
      queueMicrotask(() => {
        setActiveWorkspaceId((prev) => (prev !== targetId ? targetId : prev));
      });
    }
  }, [user, workspaceData, workspaces, activeWorkspaceId, isUserLoading, isWorkspacesLoading]);

  const activeWorkspace = useMemo(() => {
    if (!activeWorkspaceId) return workspaceData?.activeWorkspace ?? null;

    return (
      workspaces.find((w) => w.id === activeWorkspaceId) ?? workspaceData?.activeWorkspace ?? null
    );
  }, [activeWorkspaceId, workspaces, workspaceData]);

  const handleSwitchWorkspace = useCallback(
    async (workspaceId: string) => {
      if (!workspaceId || workspaceId === activeWorkspaceId) return;

      try {
        await mutateAsync({ workspaceId });
        setActiveWorkspaceId(workspaceId);
        router.refresh();
      } catch (error) {
        console.error("Failed to switch workspace:", error);
      }
    },
    [activeWorkspaceId, mutateAsync, router]
  );

  const value = useMemo(
    () => ({
      workspaces,
      activeWorkspace,
      activeWorkspaceId,
      isLoading: isUserLoading || isWorkspacesLoading,
      isSwitching: isPending,
      switchWorkspace: handleSwitchWorkspace,
    }),
    [
      workspaces,
      activeWorkspace,
      activeWorkspaceId,
      isUserLoading,
      isWorkspacesLoading,
      isPending,
      handleSwitchWorkspace,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};
