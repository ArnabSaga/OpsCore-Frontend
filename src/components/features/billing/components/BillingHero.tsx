import { CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type BillingHeroProps = {
  workspaceName?: string;
  backHref?: string;
};

const BillingHero = ({ workspaceName, backHref = "/dashboard" }: BillingHeroProps) => {
  return (
    <section
      data-billing-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Billing
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Manage your subscription, usage, and billing history
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              View your active plan, monitor workspace limits, and manage Stripe billing actions
              from one central billing workspace.
            </p>
            {workspaceName ? (
              <p className="text-sm font-medium text-[#CBB5FF]">{workspaceName}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href={backHref}>Back</Link>
          </Button>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <CreditCard className="mb-3 h-5 w-5 text-[#CBB5FF]" />
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Billing control</p>
            <p className="mt-2 text-base font-semibold text-white">
              Stripe-powered subscription flow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingHero;
