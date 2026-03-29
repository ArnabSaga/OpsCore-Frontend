import { Skeleton } from "@/components/ui/skeleton";

const PlatformInvoiceListSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#101828]/40 p-1 backdrop-blur-3xl">
        <div className="h-14 border-b border-white/5 bg-white/2" />
        <div className="divide-y divide-white/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex h-20 items-center px-6 gap-6">
              <Skeleton className="h-4 w-32 bg-purple-500/10" />
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="h-4 flex-1 bg-white/5" />
              <Skeleton className="h-4 w-28 bg-white/5" />
              <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
              <Skeleton className="h-4 w-24 bg-white/5 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformInvoiceListSkeleton;
