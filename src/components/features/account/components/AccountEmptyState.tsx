"use client";

import { UserRoundX } from "lucide-react";

const AccountEmptyState = () => {
  return (
    <div className="rounded-[28px] border border-dashed border-white/10 bg-[#101828]/70 px-6 py-14 text-center backdrop-blur-xl">
      <UserRoundX className="mx-auto mb-4 h-12 w-12 text-[#667085]" />
      <h3 className="text-xl font-semibold text-white">Account not available</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#94A3B8]">
        We could not load your account profile right now. Please refresh and try again.
      </p>
    </div>
  );
};

export default AccountEmptyState;
