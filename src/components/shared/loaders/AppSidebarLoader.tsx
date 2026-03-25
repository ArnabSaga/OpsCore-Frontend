"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const AppSidebarLoader = () => {
  return (
    <aside className="hidden w-[280px] border-r border-white/10 bg-[#111111]/95 px-5 py-6 lg:flex lg:flex-col">
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

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-white/5" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <Skeleton className="h-3 w-20 bg-white/5" />
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((__, itemIndex) => (
                <div
                  key={`${groupIndex}-${itemIndex}`}
                  className="rounded-xl border border-white/5 bg-white/2 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-md bg-white/10" />
                    <Skeleton className="h-4 w-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
        <Skeleton className="h-4 w-20 bg-white/10" />
        <Skeleton className="mt-2 h-3 w-36 bg-white/5" />
      </div>
    </aside>
  );
};

export default AppSidebarLoader;
