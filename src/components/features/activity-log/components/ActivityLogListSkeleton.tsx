const ActivityLogListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="h-[130px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]/80" />
      <div className="h-[540px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]/80" />
    </div>
  );
};

export default ActivityLogListSkeleton;
