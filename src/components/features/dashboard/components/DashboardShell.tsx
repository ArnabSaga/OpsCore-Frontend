"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import AppHeader from "@/components/shared/layout/AppHeader";
import AppSidebar from "@/components/shared/layout/AppSidebar";
import AuthSessionErrorState from "@/components/shared/error-state/AuthSessionErrorState";
import NoWorkspaceState from "@/components/shared/empty-state/NoWorkspaceState";
import DashboardShellLoader from "@/components/shared/loaders/DashboardShellLoader";
import { useUser } from "@/hooks/useUser";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { UserRole } from "@/lib/authUtils";

type DashboardShellProps = {
  children: React.ReactNode;
};

const DashboardShellContent = ({
  children,
  user,
}: DashboardShellProps & {
  user: NonNullable<ReturnType<typeof useUser>["data"]>;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { activeWorkspace, isLoading: isWorkspaceLoading } = useWorkspaceContext();

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }
  }, [activeWorkspace?.id]);

  if (isWorkspaceLoading) {
    return <DashboardShellLoader />;
  }

 
  const effectiveRole: UserRole | null =
    user.systemRole === "SUPER_ADMIN"
      ? "SUPER_ADMIN"
      : (activeWorkspace?.role as UserRole) ?? user.systemRole ?? null;

  if (!activeWorkspace && user.systemRole !== "SUPER_ADMIN") {
    return (
      <div className="flex h-screen overflow-hidden bg-[#0B0B0B] text-white">
        <AppSidebar userRole={effectiveRole} />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AppHeader user={user} />

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
              <NoWorkspaceState />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AppSidebar userRole={effectiveRole} />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader user={user} />

        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
  );
};

const DashboardShell = ({ children }: DashboardShellProps) => {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <DashboardShellLoader />;
  }

  if (isError) {
    return <AuthSessionErrorState />;
  }

  if (!user) {
    return null;
  }

  return <DashboardShellContent user={user}>{children}</DashboardShellContent>;
};

export default DashboardShell;
