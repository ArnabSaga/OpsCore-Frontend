"use client";

import { ShieldCheck, Sparkles } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

const AccountHero = ({
  title = "Account settings",
  description = "Manage your personal profile, workspace access, and security preferences across OpsCore.",
}: Props) => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#1D2939]/90 via-[#101828]/95 to-[#0F172A]/90 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.18),transparent_30%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#C7B6FF] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Personal workspace identity
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] sm:text-base">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
            <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7F56D9]/20 text-[#C7B6FF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-white">Secure by default</p>
            <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
              Profile and password management are handled through your authenticated account.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
            <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7F56D9]/20 text-[#C7B6FF]">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-white">Workspace-aware</p>
            <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
              See your roles and memberships across the workspaces you belong to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountHero;
