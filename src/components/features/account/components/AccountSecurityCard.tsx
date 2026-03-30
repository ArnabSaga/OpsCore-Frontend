"use client";

import ChangePasswordForm from "@/components/features/auth/components/ChangePasswordForm";

const AccountSecurityCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Password & security</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Protect your account by keeping your password secure and updated.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <ChangePasswordForm />
      </div>
    </section>
  );
};

export default AccountSecurityCard;
