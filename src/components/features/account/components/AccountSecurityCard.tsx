"use client";

import { ShieldAlert } from "lucide-react";
import ChangePasswordForm from "@/components/features/auth/components/ChangePasswordForm";

type Props = {
  hasPassword?: boolean;
};

const AccountSecurityCard = ({ hasPassword = true }: Props) => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Password & security</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          {hasPassword
            ? "Protect your account by keeping your password secure and updated."
            : "Manage your account security through your connected social provider."}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        {hasPassword ? (
          <ChangePasswordForm />
        ) : (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
              <ShieldAlert className="h-6 w-6 text-[#CBB5FF]" />
            </div>

            <div className="max-w-xs space-y-2">
              <h3 className="text-sm font-semibold text-white">Managed by Social Provider</h3>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                Your account is currently using Google sign-in. Password management is handled
                directly by Google to ensure maximum security.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountSecurityCard;
