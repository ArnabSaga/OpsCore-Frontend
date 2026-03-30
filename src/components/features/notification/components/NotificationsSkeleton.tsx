const NotificationsSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="h-[120px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="space-y-4">
        <div className="h-[160px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        <div className="h-[160px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        <div className="h-[160px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
