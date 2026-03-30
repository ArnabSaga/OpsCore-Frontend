"use client";

import { Building2, Shield, Users } from "lucide-react";

import type { AccountProfile } from "@/components/features/account/types/account.types";

type Props = {
  profile: AccountProfile;
};

const AccountWorkspaceMembershipsCard = ({ profile }: Props) => {
  const memberships = profile.workspaceMembers ?? [];

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Workspace memberships</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Review your roles and participation across your workspaces.
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#94A3B8]">
          {memberships.length} workspace{memberships.length === 1 ? "" : "s"}
        </div>
      </div>

      {memberships.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-[#667085]" />
          <p className="text-sm font-medium text-white">No memberships found</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            You are not currently assigned to any workspace.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {memberships.map((membership) => (
            <div
              key={`${membership.workspace.id}-${membership.role}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F56D9]/15 text-[#C7B6FF]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{membership.workspace.name}</p>
                    <p className="text-xs text-[#94A3B8]">/{membership.workspace.slug}</p>
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#94A3B8]">
                  {membership.status}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#C7B6FF]">
                <Shield className="h-4 w-4" />
                <span className="font-medium">{membership.role}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AccountWorkspaceMembershipsCard;
