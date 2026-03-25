import DashboardShell from "@/components/features/dashboard/components/DashboardShell";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WorkspaceProvider>
      <DashboardShell>{children}</DashboardShell>
    </WorkspaceProvider>
  );
}
