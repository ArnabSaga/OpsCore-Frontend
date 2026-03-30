"use client";

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
);

const AccountPageSkeleton = () => {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-[220px] rounded-[32px]" />

      <div className="grid gap-6">
        <SkeletonBlock className="h-[220px] rounded-[28px]" />
        <SkeletonBlock className="h-[420px] rounded-[28px]" />
        <SkeletonBlock className="h-[260px] rounded-[28px]" />
      </div>
    </div>
  );
};

export default AccountPageSkeleton;
