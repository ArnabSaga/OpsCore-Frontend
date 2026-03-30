"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, CreditCard, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type PricingFeature = {
  label: string;
};

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  features: PricingFeature[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "A clean starting point for small teams that want structured workspaces, task flow, and essential business visibility.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: "Start free",
    ctaHref: "/register",
    icon: Layers3,
    features: [
      { label: "1 workspace with core setup" },
      { label: "Project and task management" },
      { label: "Basic billing visibility" },
      { label: "Role-based team access" },
      { label: "Essential activity tracking" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "For growing teams that need stronger collaboration, smarter visibility, and better operational control across workspaces.",
    monthlyPrice: 20,
    yearlyPrice: 170,
    ctaLabel: "Get started",
    ctaHref: "/register",
    highlighted: true,
    badge: "Most popular",
    icon: Sparkles,
    features: [
      { label: "Unlimited projects and workflows" },
      { label: "Advanced task and execution layers" },
      { label: "Invoice and billing operations" },
      { label: "Analytics and performance tracking" },
      { label: "Workspace insights and reporting" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description:
      "Built for advanced teams that need dedicated support, stricter control, and enterprise-ready operational confidence.",
    monthlyPrice: 100,
    yearlyPrice: 800,
    ctaLabel: "Contact sales",
    ctaHref: "/contact",
    icon: ShieldCheck,
    features: [
      { label: "Multi-workspace operational management" },
      { label: "Advanced security and permissions" },
      { label: "Priority support and onboarding" },
      { label: "Custom workflow consultation" },
      { label: "Scalable billing and revenue oversight" },
    ],
  },
];

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = useMemo(
    () => ["Projects", "Billing", "Analytics", "Workspaces", "Execution", "Visibility"],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const toggle = toggleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || !toggle || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(header.children, { opacity: 0, y: 26 });
      gsap.set(toggle, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 42, scale: 0.985 });

      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: header,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(toggle, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: toggle,
          start: "top 90%",
          once: true,
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      cards.forEach((card) => {
        const glow = card!.querySelector("[data-pricing-glow]");

        if (glow) {
          gsap.to(glow, {
            opacity: 0.95,
            scale: 1.08,
            duration: 3.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          });
        }

        const onEnter = () => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: "power3.out",
            force3D: true,
          });
        };

        const onLeave = () => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            force3D: true,
          });
        };

        (
          card as HTMLDivElement & {
            __enterHandler?: () => void;
            __leaveHandler?: () => void;
          }
        ).__enterHandler = onEnter;
        (
          card as HTMLDivElement & {
            __enterHandler?: () => void;
            __leaveHandler?: () => void;
          }
        ).__leaveHandler = onLeave;

        card!.addEventListener("mouseenter", onEnter);
        card!.addEventListener("mouseleave", onLeave);
      });
    }, section);

    return () => {
      cards.forEach((card) => {
        const typed = card as HTMLDivElement & {
          __enterHandler?: () => void;
          __leaveHandler?: () => void;
        };

        if (typed.__enterHandler) {
          card!.removeEventListener("mouseenter", typed.__enterHandler);
        }
        if (typed.__leaveHandler) {
          card!.removeEventListener("mouseleave", typed.__leaveHandler);
        }
      });

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-[#0C111D] py-24 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
        <div className="absolute -left-24 top-56 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.6),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center sm:mb-12"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <CreditCard className="mr-2 h-4 w-4 text-[#7F56D9]" />
            Pricing
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[3.7rem] lg:text-[4.5rem]">
            Flexible plans for
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              modern business operations
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            Choose the OpsCore plan that fits your team—from structured workspace setup to advanced
            billing, execution, and operational visibility.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {stats.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={toggleRef}
          className="mb-10 flex items-center justify-center gap-4 text-sm sm:mb-12"
        >
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

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl",
                  "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.38)]",
                  plan.highlighted && "border-[#8B6CFF]/25 bg-[rgba(25,22,52,0.8)]"
                )}
              >
                <div
                  data-pricing-glow
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
                      Built for clean operational growth.
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
                      href={plan.ctaHref}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      {plan.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/10" />
                    <span className="text-sm font-medium text-white/75">Features +</span>
                    <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/10" />
                  </div>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/8 p-1 text-white/85">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm leading-7 text-[#D0D5DD]">{feature.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Structured workspace growth",
              text: "Start simple and scale cleanly as your operations expand.",
              icon: Layers3,
            },
            {
              title: "Execution-ready pricing",
              text: "Plans designed around projects, billing, and visibility.",
              icon: Sparkles,
            },
            {
              title: "Operational confidence",
              text: "Security, control, and support for serious business teams.",
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
