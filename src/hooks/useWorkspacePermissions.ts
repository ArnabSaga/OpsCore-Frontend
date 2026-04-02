"use client";

import { useMemo } from "react";
import { useWorkspaceContext } from "./useWorkspaceContext";

export const useWorkspacePermissions = () => {
  const { activeWorkspace, isResolved, isLoading } = useWorkspaceContext();

  const permissions = useMemo(() => {
    if (!isResolved || isLoading) {
      return {
        canCreateProject: false,
        canCreateTask: false,
        isPermissionsResolved: false,
        role: null,
      };
    }

    const role = activeWorkspace?.role;

    const isPermissionsResolved = true;

    if (!role) {
      return {
        canCreateProject: false,
        canCreateTask: false,
        isPermissionsResolved,
        role: null,
      };
    }

    const isOwnerOrAdmin = role === "OWNER" || role === "ADMIN";

    return {
      canCreateProject: isOwnerOrAdmin,
      canCreateTask: isOwnerOrAdmin,
      isPermissionsResolved,
      role,
    };
  }, [activeWorkspace?.role, isResolved, isLoading]);

  return permissions;
};
