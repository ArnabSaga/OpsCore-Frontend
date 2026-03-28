import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-[#101828] p-8">
        <Skeleton className="h-5 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-10 w-96 max-w-full bg-white/10" />
        <Skeleton className="mt-3 h-5 w-[620px] max-w-full bg-white/5" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-32 rounded-xl bg-white/10" />
          <Skeleton className="h-10 w-36 rounded-xl bg-white/5" />
          <Skeleton className="h-10 w-28 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="mt-4 h-9 w-20 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-28 bg-white/5" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6">
            <Skeleton className="h-6 w-36 bg-white/10" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6">
            <Skeleton className="h-6 w-44 bg-white/10" />
            <Skeleton className="mt-5 h-32 w-full rounded-2xl bg-white/5" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6">
            <Skeleton className="h-6 w-36 bg-white/10" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6">
            <Skeleton className="h-6 w-40 bg-white/10" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;
