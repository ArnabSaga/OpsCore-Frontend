"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  Layers3,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  cta: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlighted?: boolean;
  features: string[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "A strong entry point for growing teams that need structured workspaces, task flow, and essential operational visibility.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Start free",
    href: "/register",
    icon: Layers3,
    features: [
      "1 workspace with core setup",
      "Projects and task tracking",
      "Basic billing visibility",
      "Role-based team access",
      "Essential activity overview",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "For serious teams that want stronger execution flow, better billing visibility, and cleaner coordination across the workspace.",
    monthlyPrice: 20,
    yearlyPrice: 17,
    cta: "Get started",
    href: "/register",
    icon: Sparkles,
    badge: "Most popular",
    highlighted: true,
    features: [
      "Unlimited projects and workflows",
      "Advanced execution visibility",
      "Invoices and billing operations",
      "Analytics and performance tracking",
      "Operational reporting and insights",
    ],
  },
  {
    id: "Scale",
    name: "Scale",
    description:
      "Built for advanced teams that need stricter control, premium support, and enterprise-ready operational confidence.",
    monthlyPrice: 100,
    yearlyPrice: 80,
    cta: "Contact sales",
    href: "/contact",
    icon: ShieldCheck,
    features: [
      "Multi-workspace management",
      "Advanced permissions and controls",
      "Priority onboarding and support",
      "Custom workflow consultation",
      "Scalable billing oversight",
    ],
  },
];

const pricingHighlights = [
  {
    title: "Workspace-first structure",
    description:
      "Plans are built around structured workspaces, execution flow, and real operational use cases.",
    icon: Layers3,
  },
  {
    title: "Execution-ready value",
    description:
      "From projects and tasks to billing and analytics, pricing aligns with how modern teams actually work.",
    icon: Workflow,
  },
  {
    title: "Scalable business control",
    description:
      "Upgrade when you need stronger visibility, more support, or broader operational coordination.",
    icon: BarChart3,
  },
];

const comparisonPoints = [
  {
    title: "Projects & tasks",
    starter: true,
    growth: true,
    scale: true,
  },
  {
    title: "Billing visibility",
    starter: true,
    growth: true,
    scale: true,
  },
  {
    title: "Advanced analytics",
    starter: false,
    growth: true,
    scale: true,
  },
  {
    title: "Priority support",
    starter: false,
    growth: false,
    scale: true,
  },
  {
    title: "Multi-workspace operations",
    starter: false,
    growth: false,
    scale: true,
  },
];

const benefits = [
  "Flexible plans built for serious operational growth",
  "Unified workspaces, execution, and billing visibility",
  "Scalable structure that grows with your team's needs",
  "Premium support and enterprise-ready operational confidence",
];

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function SectionGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
      <div className="absolute -left-24 top-48 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
    </div>
  );
}

export default function PricingComponents() {
  const [isYearly, setIsYearly] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const plansRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(() => ["Projects", "Billing", "Insights", "Execution", "Workspaces"], []);

  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const plans = plansRef.current;
    const highlights = highlightsRef.current;
    const comparison = comparisonRef.current;
    const cta = ctaRef.current;

    if (!section || !hero || !plans || !highlights || !comparison || !cta) return;

    const ctx = gsap.context(() => {
      const reveal = (target: Element | NodeListOf<Element> | Element[], trigger: Element) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power4.out",
            force3D: true,
            scrollTrigger: {
              trigger,
              start: "top 84%",
              once: true,
            },
          }
        );
      };

      reveal(Array.from(hero.children), hero);
      reveal(Array.from(plans.children), plans);
      reveal(Array.from(highlights.children), highlights);
      reveal(Array.from(comparison.children), comparison);
      reveal(Array.from(cta.children), cta);

      const floatingNodes = section.querySelectorAll("[data-float]");
      floatingNodes.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -8 : 8,
          duration: 3 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
          delay: 1.2,
          scrollTrigger: {
            trigger: node,
            start: "top 84%",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing-page"
      className="relative overflow-hidden bg-[#0C111D] py-24 text-white sm:py-28"
    >
      <SectionGlow />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Hero */}
        <div
          ref={heroRef}
          className="mx-auto mb-16 flex max-w-5xl flex-col items-center text-center sm:mb-20"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <CreditCard className="mr-2 h-4 w-4 text-[#7F56D9]" />
            Pricing
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[5rem]">
            Pricing built for
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              serious operational growth
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            OpsCore pricing is designed around how modern teams actually run: workspaces, execution,
            billing visibility, and operational clarity in one system.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stats.map((item: string) => (
              <div
                key={item}
                data-float
                className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm backdrop-blur-xl"
              >
                <span className="font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Toggle + plans */}
        <div ref={plansRef} className="mb-16 sm:mb-20">
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <span
                className={cn(
                  "font-medium transition-colors duration-300",
                  !isYearly ? "text-white" : "text-[#94A3B8]"
                )}
              >
                Billed Monthly
              </span>

              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-[#7F56D9] data-[state=unchecked]:bg-white/10"
              />

              <span
                className={cn(
                  "font-medium transition-colors duration-300",
                  isYearly ? "text-white" : "text-[#94A3B8]"
                )}
              >
                Billed Yearly
                <span className="ml-1 text-[#C4B5FD]">(save up to 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan: PricingPlan) => {
              const Icon = plan.icon;
              const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  data-float
                  className={cn(
                    "group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl",
                    "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.38)]",
                    plan.highlighted && "border-[#8B6CFF]/25 bg-[rgba(25,22,52,0.8)]"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-10 top-0 h-40 rounded-full opacity-80 blur-3xl",
                      plan.highlighted ? "bg-[#8E72FF]/28" : "bg-[#7F56D9]/14"
                    )}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_30%,rgba(255,255,255,0.02)_100%)]" />

                  <div className="relative">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                        <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/18 blur-md" />
                        <Icon className="relative h-6 w-6 text-[#DCCFFF]" />
                      </div>

                      {plan.badge ? (
                        <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xl">
                          {plan.badge}
                        </div>
                      ) : null}
                    </div>

                    <h3 className="text-[2rem] font-semibold tracking-[-0.03em] text-white">
                      {plan.name}
                    </h3>

                    <p className="mt-4 min-h-[72px] text-sm leading-7 text-[#94A3B8]">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="text-[3rem] font-semibold leading-none tracking-[-0.04em] text-white">
                        {formatPrice(currentPrice)}
                      </span>
                      <span className="pb-1 text-sm text-[#94A3B8]">
                        {currentPrice === 0 ? "/ forever" : "/ month"}
                      </span>
                    </div>

                    {isYearly && currentPrice !== 0 ? (
                      <p className="mt-2 text-sm text-[#C4B5FD]">
                        Annual billing, lower effective monthly rate.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-[#667085]">
                        Designed for cleaner operational growth.
                      </p>
                    )}

                    <Button
                      asChild
                      className={cn(
                        "mt-8 h-14 w-full rounded-full text-base font-semibold",
                        plan.highlighted
                          ? "border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6D5AE6_45%,#8E72FF_100%)] text-white shadow-[0_16px_40px_rgba(127,86,217,0.28)] hover:opacity-95"
                          : "border border-white/10 bg-[rgba(12,17,29,0.38)] text-white hover:bg-white/6"
                      )}
                    >
                      <Link
                        href={plan.href}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {plan.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/10" />
                      <span className="text-sm font-medium text-white/75">Features +</span>
                      <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/10" />
                    </div>

                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-full bg-white/8 p-1 text-white/85">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm leading-7 text-[#D0D5DD]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Highlights / why pricing works */}
        <div ref={highlightsRef} className="mb-16 grid gap-6 md:grid-cols-3 sm:mb-20">
          {pricingHighlights.map((item: (typeof pricingHighlights)[number]) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-float
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,24,40,0.7)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-full bg-[#8E72FF]/16 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/45 to-transparent" />

                <div className="relative">
                  <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF] w-fit">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold leading-tight text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Comparison / CTA */}
        <div
          ref={comparisonRef}
          className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Quick comparison
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                Pick the plan that matches your team&apos;s operational stage
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                Start with essential structure, then expand into deeper execution, billing
                visibility, and premium operational support as your needs grow.
              </p>

              <div className="mt-8 space-y-4">
                {comparisonPoints.map((row: (typeof comparisonPoints)[number]) => (
                  <div
                    key={row.title}
                    className="rounded-[22px] border border-white/10 bg-white/3 p-4 backdrop-blur-xl"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-white">{row.title}</p>
                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1",
                            row.starter
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-white/5 text-white/45"
                          )}
                        >
                          Starter
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1",
                            row.growth
                              ? "bg-[#7F56D9]/18 text-[#DCCFFF]"
                              : "bg-white/5 text-white/45"
                          )}
                        >
                          Growth
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1",
                            row.scale
                              ? "bg-[#8E72FF]/18 text-[#E5DBFF]"
                              : "bg-white/5 text-white/45"
                          )}
                        >
                          Scale
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {benefits.map((item: string) => (
              <div
                key={item}
                data-float
                className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-[#D0D5DD]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.76)] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem]">
                Ready to choose a cleaner operating system for your team?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Start with OpsCore and choose the plan that fits your current stage— then scale into
                stronger execution, billing visibility, and operational control.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className={cn(
                    "h-12 rounded-full border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-6 text-sm font-semibold text-white",
                    "shadow-[0_16px_40px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_44px_rgba(127,86,217,0.38)]"
                  )}
                >
                  <Link href="/register" className="inline-flex items-center gap-2">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-12 rounded-full px-4 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
                >
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Talk to sales
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
