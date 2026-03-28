import { Skeleton } from "@/components/ui/skeleton";

const TaskCalendarSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-[#101828] p-8">
        <Skeleton className="h-5 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-10 w-80 max-w-full bg-white/10" />
        <Skeleton className="mt-3 h-5 w-[560px] max-w-full bg-white/5" />
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Skeleton className="h-11 w-full max-w-md rounded-xl bg-white/10" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-40 rounded-xl bg-white/10" />
            <Skeleton className="h-11 w-40 rounded-xl bg-white/5" />
            <Skeleton className="h-11 w-40 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <Skeleton className="h-4 w-8 bg-white/10" />
                <Skeleton className="mt-4 h-4 w-full bg-white/5" />
                <Skeleton className="mt-2 h-4 w-5/6 bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
          <Skeleton className="h-6 w-36 bg-white/10" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendarSkeleton;
