"use client";

import { useParams } from "next/navigation";

import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import { useUser } from "@/hooks/useUser";

export const useTaskRouteContext = () => {
  const params = useParams<{ taskId?: string; projectId?: string }>();
  const taskId = params?.taskId ?? null;
  const projectId = params?.projectId ?? null;

  const { data: user } = useUser();
  const { activeWorkspaceId, activeWorkspace } = useWorkspaceContext();

  const taskQuery = useTaskDetails({
    taskId: (taskId as string) ?? "",
    enabled: !!taskId,
  });

  const currentTask = taskQuery.data ?? null;

  const role = activeWorkspace?.role;

  const isOwnerOrAdmin = role === "OWNER" || role === "ADMIN";

  const isAssignee =
    !!currentTask && user?.id === currentTask.assignedToUserId;

  const isCreator =
    !!currentTask && user?.id === currentTask.createdByUserId;

  const canEditTask = isOwnerOrAdmin || isAssignee || isCreator;

  const canDeleteTask = isOwnerOrAdmin;

  return {
    taskId,
    projectId,
    workspaceId: activeWorkspaceId,
    currentTask,
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    role,
    isOwnerOrAdmin,
    isAssignee,
    isCreator,
    canEditTask,
    canDeleteTask,
  };
};
