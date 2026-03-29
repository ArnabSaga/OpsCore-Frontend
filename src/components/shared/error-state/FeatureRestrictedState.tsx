"use client";

import { Lock, LucideIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

interface FeatureRestrictedStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  variant?: "full-page" | "section-compact";
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const FeatureRestrictedState = ({
  title = "Feature Restricted",
  description = "This feature is not included in your current plan. Upgrade to unlock advanced capabilities.",
  icon: Icon = Lock,
  variant = "full-page",
  ctaLabel,
  ctaHref,
  className,
}: FeatureRestrictedStateProps) => {
  const { activeWorkspaceId } = useWorkspaceContext();

  // Default to workspace billing settings if not provided
  const resolvedCtaHref = ctaHref ?? (activeWorkspaceId ? `/workspaces/${activeWorkspaceId}/settings/billing` : undefined);
  const resolvedCtaLabel = ctaLabel ?? "Upgrade Plan";

  if (variant === "section-compact") {
    return (
      <div
        className={cn(
          "relative flex h-full min-h-[160px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/40 p-6 text-center shadow-lg backdrop-blur-md",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,86,217,0.1),transparent_70%)]" />
        
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F56D9]/15">
            <Icon className="h-5 w-5 text-[#CBB5FF]" />
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <p className="text-xs leading-relaxed text-[#94A3B8] max-w-[200px]">
              {description}
            </p>
          </div>

          {resolvedCtaHref && (
            <Button
              asChild
              variant="outline"
              size="xs"
              className="mt-1 rounded-lg border-white/10 bg-white/5 text-[10px] h-7 hover:bg-[#7F56D9]/20 hover:text-white transition-all"
            >
              <Link href={resolvedCtaHref}>
                <Sparkles className="mr-1.5 h-3 w-3 text-[#CBB5FF]" />
                {resolvedCtaLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-[#101828] p-8 text-center shadow-2xl md:p-12",
        className
      )}
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.1),transparent_35%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7F56D9]/15 shadow-[0_0_30px_rgba(127,86,217,0.2)]">
          <Icon className="h-8 w-8 text-[#CBB5FF]" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <p className="text-sm leading-7 text-[#94A3B8] md:text-base">
            {description}
          </p>
        </div>

        {resolvedCtaHref && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-xl bg-[#7F56D9] px-6 text-white shadow-[0_8px_20px_rgba(127,86,217,0.25)] hover:bg-[#6941C6] hover:shadow-[0_12px_25px_rgba(127,86,217,0.35)] transition-all"
            >
              <Link href={resolvedCtaHref}>
                <Sparkles className="mr-2 h-4 w-4" />
                {resolvedCtaLabel}
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureRestrictedState;
