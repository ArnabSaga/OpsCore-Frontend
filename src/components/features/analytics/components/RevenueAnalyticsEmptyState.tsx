const RevenueAnalyticsEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 px-6 py-16 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white">No revenue analytics available</h3>
      <p className="mt-2 text-sm text-[#94A3B8]">
        Try adjusting the date range or currency filter to inspect revenue activity.
      </p>
    </div>
  );
};

export default RevenueAnalyticsEmptyState;
