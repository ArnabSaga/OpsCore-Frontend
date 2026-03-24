import { Skeleton } from "@/components/ui/skeleton";

const GlobalLoadingPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0B] px-4 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#7F56D9]/15 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-[#6941C6]/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#1D2939]/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#7F56D9] to-[#6941C6] shadow-[0_10px_30px_rgba(127,86,217,0.35)]">
            <span className="text-xl font-bold text-white">O</span>
          </div>

          <h1 className="text-2xl font-semibold text-white">Loading OpsCore</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Preparing your workspace experience...</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="h-11 w-full rounded-xl bg-white/10" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <Skeleton className="h-11 w-full rounded-xl bg-white/10" />
          </div>

          <Skeleton className="mt-2 h-11 w-full rounded-xl bg-[#7F56D9]/20" />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <Skeleton className="h-20 rounded-2xl bg-white/5" />
          <Skeleton className="h-20 rounded-2xl bg-white/5" />
          <Skeleton className="h-20 rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoadingPage;
