"use client";

import { ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

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

      <div className="rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
        {hasPassword ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
                  <ShieldCheck className="h-6 w-6 text-[#CBB5FF]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Change your password
                  </h3>
                  <p className="max-w-xl text-sm leading-6 text-[#94A3B8]">
                    Update your password in a dedicated secure screen for a cleaner experience and
                    better focus.
                  </p>
                </div>
              </div>

              <div className="sm:shrink-0">
                <Link
                  href="/change-password"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#7F56D9] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6941C6] hover:shadow-[0_10px_30px_rgba(127,86,217,0.25)] sm:w-auto"
                >
                  Change password
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Secure by default</p>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  Password changes happen in a dedicated full page instead of inside the dashboard
                  card.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Better usability</p>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  This keeps the account security page clean and avoids cramped form rendering
                  inside the dashboard layout.
                </p>
              </div>
            </div>
          </div>
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
