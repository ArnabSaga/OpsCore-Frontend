"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useSwitchWorkspace } from "@/components/features/workspace/hooks/useSwitchWorkspace";
import { useWorkspaces } from "@/components/features/workspace/hooks/useWorkspaces";
import { useUser } from "@/hooks/useUser";
import type { WorkspaceSummary } from "@/types/workspace.types";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { analyticsQueryKeys } from "@/components/features/analytics/hooks/analytics.query-keys";

type WorkspaceContextValue = {
  workspaces: WorkspaceSummary[];
  activeWorkspace: WorkspaceSummary | null;
  activeWorkspaceId: string | null;
  isLoading: boolean;
  isResolved: boolean;
  isError: boolean;
  isSwitching: boolean;
  switchingWorkspaceId: string | null;
  hasServerWorkspaceContext: boolean;
  switchWorkspace: (workspaceId: string) => Promise<void>;
};

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUser();
  const {
    data: workspaceData,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useWorkspaces();
  const { mutateAsync, isPending } = useSwitchWorkspace();

  const [switchingWorkspaceId, setSwitchingWorkspaceId] = useState<string | null>(null);

  // Only used for optimistic local override after manual switching
  const [manualWorkspaceId, setManualWorkspaceId] = useState<string | null>(null);

  const workspaces = useMemo(() => workspaceData?.workspaces ?? [], [workspaceData]);

  const backendActiveId = useMemo(
    () =>
      workspaceData?.activeWorkspace?.id ??
      user?.activeWorkspace?.id ??
      user?.activeWorkspaceId ??
      null,
    [workspaceData, user]
  );

  const firstWorkspaceId = workspaces[0]?.id ?? null;

  const currentActiveId = useMemo(
    () => manualWorkspaceId ?? backendActiveId ?? firstWorkspaceId ?? null,
    [manualWorkspaceId, backendActiveId, firstWorkspaceId]
  );

  const activeWorkspace = useMemo(() => {
    if (!currentActiveId) return null;
    return workspaces.find((workspace) => workspace.id === currentActiveId) ?? null;
  }, [currentActiveId, workspaces]);

  const isResolved = useMemo(() => {
    if (isUserLoading || isWorkspacesLoading) return false;
    if (workspaces.length === 0) return true;
    return !!activeWorkspace;
  }, [isUserLoading, isWorkspacesLoading, workspaces.length, activeWorkspace]);

  React.useEffect(() => {
    if (
      isUserLoading ||
      isWorkspacesLoading ||
      isPending ||
      backendActiveId ||
      !firstWorkspaceId
    ) {
      return;
    }

    void mutateAsync(firstWorkspaceId)
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
        await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
        await queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
        router.refresh();
      })
      .catch((error) => {
        console.error("Failed to auto-sync initial workspace:", error);
      });
  }, [
    backendActiveId,
    firstWorkspaceId,
    isPending,
    isUserLoading,
    isWorkspacesLoading,
    mutateAsync,
    queryClient,
    router,
  ]);

  const handleSwitchWorkspace = useCallback(
    async (workspaceId: string) => {
      if (!workspaceId || workspaceId === currentActiveId) return;

      try {
        setSwitchingWorkspaceId(workspaceId);
        // optimistic local update
        setManualWorkspaceId(workspaceId);

        await mutateAsync(workspaceId);

        await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
        await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
        await queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
        await queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
        await queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
        await queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });

        router.refresh();

        const switchedWorkspace = workspaces.find((w) => w.id === workspaceId);
        if (switchedWorkspace) {
          toast.success(`Switched to ${switchedWorkspace.name}`, {
            description: "Your session has been updated.",
          });
        }
      } catch (error) {
        // rollback optimistic override on failure
        setManualWorkspaceId(null);
        console.error("Failed to switch workspace:", error);
      } finally {
        setSwitchingWorkspaceId(null);
      }
    },
    [currentActiveId, mutateAsync, queryClient, router, workspaces]
  );

  const hasServerWorkspaceContext = useMemo(() => {
    return !!backendActiveId;
  }, [backendActiveId]);

  const value = useMemo(
    () => ({
      workspaces,
      activeWorkspace,
      activeWorkspaceId: currentActiveId,
      isLoading: !isResolved,
      isResolved,
      isError: isUserError || isWorkspacesError,
      isSwitching: !!switchingWorkspaceId,
      switchingWorkspaceId,
      hasServerWorkspaceContext,
      switchWorkspace: handleSwitchWorkspace,
    }),
    [
      workspaces,
      activeWorkspace,
      currentActiveId,
      isResolved,
      isUserError,
      isWorkspacesError,
      switchingWorkspaceId,
      hasServerWorkspaceContext,
      handleSwitchWorkspace,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};
