"use client";

import { Skeleton } from "@/components/ui/skeleton";

const AppHeaderLoader = () => {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0B0B]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-6 w-36 bg-white/10" />
          <Skeleton className="h-4 w-56 bg-white/5" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 py-2">
            <Skeleton className="h-9 w-9 rounded-xl bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <Skeleton className="h-3 w-16 bg-white/5" />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-white/5 p-1 pr-4">
            <Skeleton className="h-9 w-9 rounded-full bg-white/10" />
            <div className="hidden space-y-2 sm:block">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <Skeleton className="h-3 w-16 bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeaderLoader;
