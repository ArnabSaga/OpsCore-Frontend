"use client";

import { CreditCard, MailPlus, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { WorkspaceDetails } from "@/types/workspace.types";

type Props = {
  workspaceId: string;
  workspace: WorkspaceDetails;
  membersCount: number;
  pendingInvitationsCount: number;
};

const WorkspaceSummaryCards = ({
  workspaceId,
  workspace,
  membersCount,
  pendingInvitationsCount,
}: Props) => {
  const planLabel = workspace.planMeta?.effectivePlan
    ? workspace.planMeta.effectivePlan.charAt(0) +
      workspace.planMeta.effectivePlan.slice(1).toLowerCase()
    : "Unknown";

  const cards = [
    {
      title: "Members",
      value: String(membersCount),
      icon: Users,
      href: `/workspaces/${workspaceId}/members`,
    },
    {
      title: "Pending Invitations",
      value: String(pendingInvitationsCount),
      icon: MailPlus,
      href: `/workspaces/${workspaceId}/invitations`,
    },
    {
      title: "Effective Plan",
      value: planLabel,
      icon: CreditCard,
      href: "/billing",
    },
    {
      title: "Trial Status",
      value: workspace.planMeta?.isTrialActive ? "Active Trial" : "No Active Trial",
      icon: ShieldCheck,
      href: "/billing",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link key={card.title} href={card.href} className="group">
            <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7F56D9]/30 hover:bg-[#22314a]/90">
              <CardContent className="p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828]">
                  <Icon className="h-4 w-4 text-[#CBB5FF]" />
                </div>

                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                  {card.title}
                </p>

                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>

                <p className="mt-3 text-sm text-[#94A3B8] group-hover:text-[#CBB5FF]">
                  View details →
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default WorkspaceSummaryCards;
