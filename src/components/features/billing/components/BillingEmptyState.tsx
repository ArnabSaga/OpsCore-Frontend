const BillingEmptyState = () => {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 px-6 py-16 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white">No billing data available</h3>
      <p className="mt-2 text-sm text-[#94A3B8]">
        This workspace does not yet have enough billing activity to display detailed information.
      </p>
    </div>
  );
};

export default BillingEmptyState;
