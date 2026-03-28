import { Skeleton } from "@/components/ui/skeleton";

const ProjectMembersSkeleton = () => {
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
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 bg-white/10" />
                <Skeleton className="h-4 w-56 bg-white/5" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-xl bg-white/10" />
              <Skeleton className="h-10 w-24 rounded-xl bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMembersSkeleton;
