"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { BadgeCheck, CalendarClock, MailCheck, Shield } from "lucide-react";

import type { AccountProfile } from "@/components/features/account/types/account.types";

type Props = {
  profile: AccountProfile;
};

const AccountOverviewCard = ({ profile }: Props) => {
  const joinedAgo = profile.createdAt
    ? formatDistanceToNowStrict(new Date(profile.createdAt), { addSuffix: true })
    : "—";

  const lastUpdatedAgo = profile.updatedAt
    ? formatDistanceToNowStrict(new Date(profile.updatedAt), { addSuffix: true })
    : "—";

  const stats = [
    {
      label: "System role",
      value: profile.systemRole ?? "USER",
      icon: Shield,
    },
    {
      label: "Email verification",
      value: profile.emailVerified ? "Verified" : "Unverified",
      icon: MailCheck,
    },
    {
      label: "Account status",
      value: profile.isActive ? "Active" : "Inactive",
      icon: BadgeCheck,
    },
    {
      label: "Joined",
      value: joinedAgo,
      icon: CalendarClock,
    },
  ];

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Account overview</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Your identity, account status, and recent profile activity.
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#94A3B8]">
          Updated {lastUpdatedAgo}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7F56D9]/15 text-[#C7B6FF]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#667085]">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AccountOverviewCard;
