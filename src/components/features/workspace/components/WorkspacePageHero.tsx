"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WorkspacePageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  backHref?: string;
  className?: string;
};

const WorkspacePageHero = ({
  eyebrow = "Workspace",
  title,
  description,
  actions,
  backHref,
  className,
}: WorkspacePageHeroProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {backHref ? (
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={backHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          ) : null}

          {actions}
        </div>
      </div>
    </section>
  );
};

export default WorkspacePageHero;
