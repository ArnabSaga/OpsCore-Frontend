import { Skeleton } from "@/components/ui/skeleton";

const TaskBoardSkeleton = () => {
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

      <div className="grid gap-5 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, colIndex) => (
          <div key={colIndex} className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-4">
            <Skeleton className="h-6 w-32 bg-white/10" />
            <Skeleton className="mt-2 h-4 w-20 bg-white/5" />

            <div className="mt-5 space-y-4">
              {Array.from({ length: 3 }).map((__, cardIndex) => (
                <div
                  key={cardIndex}
                  className="rounded-[20px] border border-white/10 bg-white/5 p-4"
                >
                  <Skeleton className="h-5 w-40 bg-white/10" />
                  <Skeleton className="mt-3 h-4 w-full bg-white/5" />
                  <Skeleton className="mt-2 h-4 w-2/3 bg-white/5" />
                  <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
                    <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoardSkeleton;
