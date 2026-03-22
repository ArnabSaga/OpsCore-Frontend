import { Skeleton } from "@/components/ui/skeleton";

const GlobalLoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        {/* Sidebar skeleton */}
        <aside className="hidden w-[280px] border-r border-white/10 bg-[#111111] px-5 py-6 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/5" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-white/5 bg-white/2 p-3">
                <Skeleton className="h-4 w-full bg-white/10" />
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="border-b border-white/10 bg-[#0B0B0B]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-7 w-40 rounded-md bg-white/10" />
                <Skeleton className="h-4 w-64 rounded-md bg-white/5" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                <Skeleton className="h-10 w-28 rounded-xl bg-white/10" />
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            {/* Stats cards */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-10 w-10 rounded-xl bg-[#7F56D9]/20" />
                  </div>
                  <Skeleton className="mb-3 h-8 w-24 bg-white/10" />
                  <Skeleton className="h-4 w-32 bg-white/5" />
                </div>
              ))}
            </section>

            {/* Charts + side panel */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 backdrop-blur-xl">
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

              <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 backdrop-blur-xl">
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
            <section className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5 backdrop-blur-xl">
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

export default GlobalLoadingPage;
