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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0B0B0B] text-white"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#7F56D9]/12 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-[#6941C6]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.06),transparent_30%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px]">
        {/* Sidebar skeleton */}
        <aside
          ref={sidebarRef}
          className="hidden w-[280px] border-r border-white/10 bg-[#111111]/95 px-5 py-6 lg:block"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#7F56D9] to-[#6941C6] shadow-[0_12px_30px_rgba(127,86,217,0.35)]">
              <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/20 blur-md" />
              <Image
                src="/icons/logo.png"
                width={22}
                height={22}
                alt="OpsCore logo"
                style={{ width: "auto", height: "auto" }}
                className="relative object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/5" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-white/2 p-3 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-md bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
            <Skeleton className="h-4 w-20 bg-white/10" />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Top bar */}
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
                <Skeleton className="hidden h-10 w-28 rounded-xl bg-white/10 sm:block" />
              </div>
            </div>
          </div>

          {/* Content area */}
          <div ref={contentRef} className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
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

            {/* Charts + side panel */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 bg-white/10" />
                    <Skeleton className="h-4 w-56 bg-white/5" />
                  </div>
                  <Skeleton className="h-9 w-28 rounded-xl bg-white/10" />
                </div>

                <div className="flex h-[280px] items-end gap-3">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full rounded-t-xl bg-linear-to-t from-[#7F56D9]/30 to-[#6941C6]/10"
                      style={{
                        height: `${40 + ((index % 5) + 1) * 35}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                <div className="mb-5 space-y-2">
                  <Skeleton className="h-5 w-36 bg-white/10" />
                  <Skeleton className="h-4 w-40 bg-white/5" />
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/2 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28 bg-white/10" />
                          <Skeleton className="h-3 w-20 bg-white/5" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-14 rounded-full bg-[#12B76A]/20" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Table skeleton */}
            <section className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 bg-white/10" />
                  <Skeleton className="h-4 w-64 bg-white/5" />
                </div>

                <div className="flex gap-3">
                  <Skeleton className="h-10 w-44 rounded-xl bg-white/10" />
                  <Skeleton className="h-10 w-28 rounded-xl bg-[#7F56D9]/20" />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-4 gap-4 border-b border-white/10 bg-white/3 px-4 py-3">
                  <Skeleton className="h-4 w-20 bg-white/10" />
                  <Skeleton className="h-4 w-24 bg-white/10" />
                  <Skeleton className="h-4 w-20 bg-white/10" />
                  <Skeleton className="h-4 w-16 bg-white/10" />
                </div>

                <div className="divide-y divide-white/10">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 px-4 py-4">
                      <Skeleton className="h-4 w-24 bg-white/10" />
                      <Skeleton className="h-4 w-32 bg-white/5" />
                      <Skeleton className="h-4 w-20 bg-white/10" />
                      <Skeleton className="h-4 w-16 bg-white/5" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLoading;
