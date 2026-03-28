import { Skeleton } from "@/components/ui/skeleton";

const TaskListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-[#101828] p-6">
        <Skeleton className="h-5 w-36 bg-white/10" />
        <Skeleton className="mt-4 h-10 w-72 bg-white/10" />
        <Skeleton className="mt-3 h-4 w-[520px] max-w-full bg-white/5" />
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-11 w-36 rounded-xl bg-white/10" />
          <Skeleton className="h-11 w-28 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Skeleton className="h-11 w-full max-w-md rounded-xl bg-white/10" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-36 rounded-xl bg-white/10" />
            <Skeleton className="h-11 w-36 rounded-xl bg-white/5" />
            <Skeleton className="h-11 w-28 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5">
            <Skeleton className="h-6 w-56 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-full bg-white/5" />
            <Skeleton className="mt-2 h-4 w-2/3 bg-white/5" />
            <div className="mt-4 flex flex-wrap gap-3">
              <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-10 w-52 rounded-xl bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListSkeleton;
