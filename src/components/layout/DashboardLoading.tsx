"use client";

import { Skeleton } from "@/components/ui/skeleton";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const DashboardLoading = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
      }

      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
        );
      }

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.08 }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", delay: 0.12 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const navGroups = [
    { title: "Overview", items: 1 },
    { title: "Workspace", items: 4 },
    { title: "Insights", items: 3 },
    { title: "Account", items: 3 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#0B0B0B] text-white"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#7F56D9]/12 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-[#6941C6]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.06),transparent_30%)]" />
      </div>

      <div className="relative flex h-full w-full">
        {/* Fixed Sidebar skeleton - Pinned to left */}
        <aside
          ref={sidebarRef}
          className="sticky top-0 hidden h-screen w-[280px] flex-col border-r border-white/10 bg-[#111111]/95 px-5 py-6 lg:flex"
        >
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/20 blur-xl" />
                <Image
                  src="/icons/logo.png"
                  alt="OpsCore logo"
                  width={36}
                  height={36}
                  style={{ width: "auto", height: "auto" }}
                  className="relative object-contain drop-shadow-[0_6px_14px_rgba(255,255,255,0.35)]"
                  priority
                />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-5 w-24 bg-white/10" />
                <Skeleton className="h-3 w-32 bg-white/5" />
              </div>
            </div>

            <div className="mt-6 h-12 w-full rounded-xl border border-white/10 bg-white/3" />
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-1">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <Skeleton className="ml-2 h-3 w-20 bg-white/10" />
                <div className="space-y-2">
                  {Array.from({ length: group.items }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-md bg-white/10" />
                        <Skeleton className="h-4 w-24 bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="mt-1 h-3 w-40 bg-white/5" />
          </div>
        </aside>

        {/* Main layout matching DashboardShell - Full width minus sidebar */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header pins at top of main flex-col - Full width of main */}
          <div
            ref={headerRef}
            className="border-b border-white/10 bg-[#0B0B0B]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-7 w-40 rounded-md bg-white/10" />
                <Skeleton className="h-4 w-64 rounded-md bg-white/5" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                <Skeleton className="hidden h-10 w-32 rounded-xl bg-white/10 sm:block" />
                <Skeleton className="hidden h-10 w-10 rounded-full bg-white/10 sm:block" />
              </div>
            </div>
          </div>

          {/* Scrollable Content section - Centered internal content with max-w */}
          <div 
            ref={contentRef} 
            className="flex-1 overflow-y-auto"
          >
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
              {/* Stats cards */}
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Skeleton className="h-4 w-24 bg-white/10" />
                      <div className="rounded-xl bg-[#7F56D9]/10 p-2">
                        <Skeleton className="h-6 w-6 rounded-lg bg-[#7F56D9]/20" />
                      </div>
                    </div>
                    <Skeleton className="mb-3 h-8 w-24 bg-white/10" />
                    <Skeleton className="h-4 w-32 bg-white/5" />
                  </div>
                ))}
              </section>

              {/* Status overview charts */}
              <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
                  <Skeleton className="h-[320px] w-full bg-white/5" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
                  <Skeleton className="mb-6 h-[220px] w-full bg-white/5" />
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-3">
                        <Skeleton className="mb-2 h-3 w-16 bg-white/10" />
                        <Skeleton className="h-5 w-8 bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Invoice Summary */}
              <section className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                <Skeleton className="mb-6 h-5 w-48 bg-white/10" />
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_220px]">
                  <Skeleton className="h-[300px] w-full bg-white/5" />
                  <div className="flex flex-col justify-center space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-4">
                        <Skeleton className="mb-2 h-3 w-20 bg-white/10" />
                        <Skeleton className="h-6 w-16 bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Trends Section */}
              <section className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48 bg-white/10" />
                    <Skeleton className="h-4 w-64 bg-white/5" />
                  </div>
                  <div className="flex gap-2 p-1 rounded-2xl border border-white/10 bg-white/3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-9 w-12 rounded-xl bg-white/5" />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
                    <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
                    <Skeleton className="h-[320px] w-full bg-white/5" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
                    <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
                    <Skeleton className="h-[320px] w-full bg-white/5" />
                  </div>
                </div>
              </section>

              {/* Bottom Activity + Subscription */}
              <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <Skeleton className="mb-6 h-5 w-40 bg-white/10" />
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full bg-white/10" />
                          <Skeleton className="h-3 w-1/2 bg-white/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1D2939]/80 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl p-5">
                  <Skeleton className="mb-4 h-5 w-36 bg-white/10" />
                  <Skeleton className="mb-6 h-4 w-full bg-white/5" />
                  <Skeleton className="mb-8 h-20 w-full rounded-2xl bg-white/5" />
                  <Skeleton className="h-12 w-full rounded-xl bg-[#7F56D9]/20" />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLoading;
