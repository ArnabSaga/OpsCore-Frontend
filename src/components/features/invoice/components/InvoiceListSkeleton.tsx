const InvoiceListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="h-[120px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]/80" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]/80"
          />
        ))}
      </div>
    </div>
  );
};

export default InvoiceListSkeleton;
