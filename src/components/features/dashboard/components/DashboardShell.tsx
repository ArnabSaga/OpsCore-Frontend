"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import DashboardLoading from "@/components/layout/DashboardLoading";
import AppHeader from "@/components/shared/layout/AppHeader";
import AppSidebar from "@/components/shared/layout/AppSidebar";
import { useUser } from "@/hooks/useUser";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";

type DashboardShellProps = {
  children: React.ReactNode;
};

const DashboardShell = ({ children }: DashboardShellProps) => {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace("/login");
    }
  }, [isLoading, isError, user, router]);

  useEffect(() => {
    if (!isLoading && user && contentRef.current) {
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
  }, [isLoading, user]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!user || isError) {
    return null;
  }

  return (
    <WorkspaceProvider>
      <div className="flex min-h-screen bg-[#0B0B0B] text-white">
        <AppSidebar userRole={user?.systemRole ?? null} />

        <main className="flex min-w-0 flex-1 flex-col">
          <AppHeader user={user} />

          <div ref={contentRef} className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </WorkspaceProvider>
  );
};

export default DashboardShell;
