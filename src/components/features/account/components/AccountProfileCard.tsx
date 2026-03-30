"use client";

import AccountProfileForm from "@/components/features/account/components/AccountProfileForm";
import type { AccountProfile } from "@/components/features/account/types/account.types";

type Props = {
  profile: AccountProfile;
};

const AccountProfileCard = ({ profile }: Props) => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Profile</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Update your personal details and profile image.
        </p>
      </div>

      <AccountProfileForm profile={profile} />
    </section>
  );
};

export default AccountProfileCard;
