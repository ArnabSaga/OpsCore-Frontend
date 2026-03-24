"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import Sidebar from "../shared/layout/AppSidebar";
import Header from "../shared/layout/AppHeader";
import DashboardLoading from "./DashboardLoading";
import { useUser } from "@/hooks/useUser";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header user={user} />

        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
