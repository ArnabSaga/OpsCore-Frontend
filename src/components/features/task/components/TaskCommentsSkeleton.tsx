import { Skeleton } from "@/components/ui/skeleton";

const TaskCommentsSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-[#101828] p-8">
        <Skeleton className="h-5 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-10 w-80 max-w-full bg-white/10" />
        <Skeleton className="mt-3 h-5 w-[560px] max-w-full bg-white/5" />
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-11 w-40 rounded-xl bg-white/10" />
          <Skeleton className="h-11 w-32 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6">
        <Skeleton className="h-6 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-28 w-full rounded-2xl bg-white/5" />
        <div className="mt-4 flex justify-end">
          <Skeleton className="h-11 w-32 rounded-xl bg-white/10" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-4 w-40 bg-white/5" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-xl bg-white/10" />
                <Skeleton className="h-9 w-20 rounded-xl bg-white/5" />
              </div>
            </div>
            <Skeleton className="mt-4 h-16 w-full rounded-xl bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCommentsSkeleton;
