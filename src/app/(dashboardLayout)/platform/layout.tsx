"use client";

import DashboardShellLoader from "@/components/shared/loaders/DashboardShellLoader";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { usePlatformReveal } from "@/components/features/platform/components/usePlatformReveal";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);

  usePlatformReveal(containerRef);

  if (isLoading) {
    return <DashboardShellLoader />;
  }

  if (!user || user.systemRole !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      <div
        data-platform-reveal="hero"
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#1D2939]/90 via-[#101828]/95 to-[#0F172A]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#7F56D9]/10 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#F472B6]/5 blur-[80px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(71,84,103,0.08),transparent_25%)]" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 items-center justify-center rounded-full border border-[#7F56D9]/30 bg-[#7F56D9]/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#CBB5FF]">
              System Administration
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Platform Control Center
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-[#94A3B8]">
            Monitor and manage global system resources, workspaces, and user activity across the
            entire OpsCore platform.
          </p>
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
