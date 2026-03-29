const ActivityLogDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-[420px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        <div className="space-y-6">
          <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
          <div className="h-[260px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        </div>
      </div>
    </div>
  );
};

export default ActivityLogDetailsSkeleton;
