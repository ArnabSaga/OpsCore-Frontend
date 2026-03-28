"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchWorkspace } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";
import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { dashboardQueryKeys } from "@/components/features/dashboard/hooks/dashboard.query-keys";
import { analyticsQueryKeys } from "@/components/features/analytics/hooks/analytics.query-keys";

export const useSwitchWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => switchWorkspace(workspaceId),
    onSuccess: async () => {
      // Invalidate all relevant feature queries when switching workspace
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
      await queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });
    },
    onError: (error: Error) => {
      console.error("Workspace switch failed:", error.message);
    },
  });
};
