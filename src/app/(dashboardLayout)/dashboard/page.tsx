"use client";

import DashboardShellLoader from "@/components/shared/loaders/DashboardShellLoader";
import AuthSessionErrorState from "@/components/shared/error-state/AuthSessionErrorState";
import MemberDashboardPage from "@/components/features/dashboard/components/MemberDashboardPage";
import SuperAdminDashboardPage from "@/components/features/dashboard/components/SuperAdminDashboardPage";
import WorkspaceDashboardPage from "@/components/features/dashboard/components/WorkspaceDashboardPage";
import { useUser } from "@/hooks/useUser";

const DashboardPage = () => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return <DashboardShellLoader />;
  }

  if (isError || !user) {
    return <AuthSessionErrorState />;
  }

  if (user.systemRole === "SUPER_ADMIN") {
    return <SuperAdminDashboardPage />;
  }

  const workspaceRole =
    user.workspaceMembers?.find(
      (member) => member.workspace.id === user.activeWorkspaceId
    )?.role ?? null;

  if (workspaceRole === "MEMBER") {
    return <MemberDashboardPage />;
  }

  return <WorkspaceDashboardPage />;
};

export default DashboardPage;
