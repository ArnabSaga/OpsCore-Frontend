import { Skeleton } from "@/components/ui/skeleton";

const ProjectListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-[#101828] p-6">
        <Skeleton className="h-5 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-10 w-72 bg-white/10" />
        <Skeleton className="mt-3 h-4 w-[520px] max-w-full bg-white/5" />
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-11 w-40 rounded-xl bg-white/10" />
          <Skeleton className="h-11 w-32 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-11 w-full max-w-md rounded-xl bg-white/10" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-11 w-36 rounded-xl bg-white/10" />
          <Skeleton className="h-11 w-36 rounded-xl bg-white/5" />
          <Skeleton className="h-11 w-28 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-44 bg-white/10" />
                <Skeleton className="h-4 w-32 bg-white/5" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
            </div>

            <Skeleton className="mt-5 h-14 w-full bg-white/5" />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Skeleton className="h-24 rounded-2xl bg-white/5" />
              <Skeleton className="h-24 rounded-2xl bg-white/5" />
            </div>

            <div className="mt-5 flex gap-3">
              <Skeleton className="h-10 flex-1 rounded-xl bg-white/10" />
              <Skeleton className="h-10 flex-1 rounded-xl bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListSkeleton;
