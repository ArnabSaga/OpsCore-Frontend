"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowRight,
  Blocks,
  Bot,
  BrainCircuit,
  CreditCard,
  FolderKanban,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  size: "sm" | "lg";
  gradientClass: string;
};

const featureCards: FeatureCard[] = [
  {
    id: "workspace-intelligence",
    title: "AI Workspace Intelligence",
    description:
      "Track priorities, detect blockers, and surface execution signals across projects, teams, and workflows from one secure command layer.",
    icon: BrainCircuit,
    size: "sm",
    gradientClass: "from-[#7F56D9]/22 via-[#1D2939]/45 to-transparent",
  },
  {
    id: "workflow-control",
    title: "Unified Project & Task Control",
    description:
      "Manage projects, tasks, ownership, and progress with a premium workspace view built for execution—not just visibility.",
    icon: FolderKanban,
    size: "lg",
    gradientClass: "from-[#6941C6]/18 via-[#101828]/35 to-[#7F56D9]/10",
  },
  {
    id: "billing-ops",
    title: "Billing & Revenue Operations",
    description:
      "Handle invoices, payment flow, subscriptions, and operational finance with structured workflows that scale cleanly.",
    icon: CreditCard,
    size: "lg",
    gradientClass: "from-[#7F56D9]/20 via-[#0F172A]/35 to-[#6941C6]/10",
  },
  {
    id: "collaboration-layer",
    title: "Team Collaboration Layer",
    description:
      "Keep members aligned with role-aware visibility, updates, shared execution context, and cleaner cross-team coordination.",
    icon: Users2,
    size: "sm",
    gradientClass: "from-[#6941C6]/18 via-[#101828]/30 to-transparent",
  },
];

export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  //   const miniStack = useMemo(
  //     () => [
  //       { label: "Projects", icon: FolderKanban },
  //       { label: "Tasks", icon: CheckCircle2 },
  //       { label: "Invoices", icon: FileText },
  //       { label: "Analytics", icon: BarChart3 },
  //     ],
  //     []
  //   );

  const opsSignals = useMemo(
    () => [
      { label: "Active workspaces", value: "12", icon: Layers3 },
      { label: "Open tasks", value: "148", icon: Activity },
      { label: "Monthly invoices", value: "86", icon: CreditCard },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !header || !grid || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(header.children, { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 42, scale: 0.98 });

      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        stagger: 0.14,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          once: true,
        },
      });

      cards.forEach((card) => {
        const glow = card!.querySelector("[data-card-glow]");
        const floating = card!.querySelectorAll("[data-float]");

        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            scale: 1.08,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (floating.length) {
          gsap.to(floating, {
            yPercent: -6,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.12,
            force3D: true,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden bg-[#0C111D] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/15 blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.55),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center sm:mb-16"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
            OpsCore Features
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.15] tracking-[-0.04em] text-white sm:text-[3rem] sm:leading-[1.02] lg:text-[4.8rem]">
            Powerful infrastructure for
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              modern business operations
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            OpsCore helps teams run projects, billing, execution, insights, and workspace governance
            from one premium operating layer designed for clarity, control, and scale.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className={cn(
                "h-12 rounded-full border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-6 text-sm font-semibold text-white",
                "shadow-[0_16px_40px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_44px_rgba(127,86,217,0.38)]"
              )}
            >
              <Link href="/register" className="inline-flex items-center gap-2">
                Explore OpsCore
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/12 bg-white/4 px-6 text-sm text-white backdrop-blur-xl hover:bg-white/8 hover:text-white"
            >
              <Link href="/pricing">See platform value</Link>
            </Button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(320px,1fr)_minmax(320px,1fr)]"
        >
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            const isLarge = card.size === "lg";

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,24,40,0.66)] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
                  "transition-[border-color,box-shadow,background-color] duration-300 will-change-[transform,opacity]",
                  "hover:border-[#7F56D9]/25 hover:shadow-[0_36px_90px_rgba(0,0,0,0.45)]",
                  isLarge ? "lg:col-span-8" : "lg:col-span-4"
                )}
                onMouseEnter={(e) => {
                  gsap.killTweensOf(e.currentTarget);
                  gsap.to(e.currentTarget, {
                    y: -6,
                    duration: 0.35,
                    ease: "power3.out",
                    force3D: true,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.killTweensOf(e.currentTarget);
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    force3D: true,
                  });
                }}
              >
                <div
                  data-card-glow
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-70 blur-3xl",
                    "bg-linear-to-r",
                    card.gradientClass
                  )}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_30%,rgba(255,255,255,0.02)_100%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

                <div className="relative flex h-full flex-col justify-between p-4 sm:p-6 lg:p-7">
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A]">
                        <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/15 blur-md" />
                        <Icon className="relative h-5 w-5 text-[#D4C8FF]" />
                      </div>

                      <div>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#C4B5FD]">
                          OpsCore
                        </p>
                        <p className="text-sm text-white/60">Operational capability</p>
                      </div>
                    </div>

                    <h3 className="max-w-xl text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.65rem] lg:text-[2rem]">
                      {card.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  {card.id === "workspace-intelligence" && (
                    <div className="relative mt-8">
                      <div className="absolute inset-x-0 bottom-0 h-24 rounded-full bg-[#8E72FF]/20 blur-3xl" />
                      <div className="relative space-y-3">
                        {[
                          {
                            title: "AI signal",
                            text: "Execution risk detected in one active workspace",
                          },
                          {
                            title: "Ops insight",
                            text: "Billing delay trend identified across current cycle",
                          },
                          {
                            title: "Priority pulse",
                            text: "3 projects need owner review this week",
                          },
                        ].map((item, i) => (
                          <div
                            key={item.title}
                            data-float
                            className={cn(
                              "flex items-center justify-between rounded-2xl border border-white/10 bg-[rgba(18,25,42,0.78)] px-4 py-3 backdrop-blur-xl will-change-transform",
                              i !== 0 && "opacity-55"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-[#7F56D9]/20 p-2 text-[#CFC4FF]">
                                <Bot className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">{item.title}</p>
                                <p className="text-xs text-[#94A3B8]">{item.text}</p>
                              </div>
                            </div>
                            <BrainCircuit className="h-4 w-4 text-[#8E72FF]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.id === "workflow-control" && (
                    <div className="relative mt-8 min-h-[190px]">
                      <div className="absolute inset-x-0 bottom-0 h-24 rounded-full bg-[#8E72FF]/20 blur-3xl" />
                      <div className="relative ml-auto flex max-w-[380px] flex-col gap-4">
                        {[
                          { label: "Create project", active: false },
                          { label: "Assign task owner", active: true },
                          { label: "Track delivery stage", active: false },
                        ].map((item) => (
                          <div
                            key={item.label}
                            data-float
                            className={cn(
                              "flex items-center justify-between rounded-2xl border border-white/10 px-5 py-4 backdrop-blur-xl will-change-transform",
                              item.active
                                ? "bg-[linear-gradient(90deg,rgba(127,86,217,0.22),rgba(255,255,255,0.04))] shadow-[0_18px_40px_rgba(127,86,217,0.18)]"
                                : "bg-[rgba(18,25,42,0.72)]"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80">
                                <Workflow className="h-4 w-4" />
                              </div>
                              <span className="text-base font-medium text-white/85">
                                {item.label}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full",
                                item.active
                                  ? "bg-[#8E72FF] text-white shadow-[0_10px_24px_rgba(142,114,255,0.4)]"
                                  : "bg-white/8 text-white/60"
                              )}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.id === "billing-ops" && (
                    <div className="relative mt-8 min-h-[200px]">
                      <div className="absolute inset-x-0 top-5 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
                      <div className="relative grid gap-4 md:grid-cols-2">
                        <div className="rounded-[24px] border border-white/10 bg-[rgba(15,23,42,0.76)] p-5 backdrop-blur-xl">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                Revenue-ready billing
                              </p>
                              <p className="text-xs text-[#94A3B8]">
                                Invoices, payments, subscriptions
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-3">
                            {opsSignals.map((item) => {
                              const SignalIcon = item.icon;
                              return (
                                <div
                                  key={item.label}
                                  data-float
                                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-4 py-3 will-change-transform"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/5 p-2 text-[#CFC4FF]">
                                      <SignalIcon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm text-white/80">{item.label}</span>
                                  </div>
                                  <span className="text-sm font-semibold text-white">
                                    {item.value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(127,86,217,0.14),rgba(16,24,40,0.42))] p-5 backdrop-blur-xl">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                            OpsCore finance visibility
                          </p>
                          <h4 className="mt-3 text-xl font-semibold text-white">
                            Built for reliable operational flow
                          </h4>
                          <p className="mt-3 text-sm leading-7 text-[#A6B0C3]">
                            Connect execution with billing and keep operational finance cleaner with
                            structured status, ownership, and lifecycle visibility.
                          </p>

                          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-300">
                            <ShieldCheck className="h-4 w-4" />
                            Workspace-secured billing orchestration
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {card.id === "collaboration-layer" && (
                    <div className="relative mt-8 min-h-[170px]">
                      <div className="absolute inset-x-0 top-0 h-24 rounded-full bg-[#8E72FF]/20 blur-3xl" />
                      <div className="relative space-y-4">
                        <div
                          data-float
                          className="ml-0 max-w-[220px] rounded-2xl border border-white/10 bg-[rgba(127,86,217,0.18)] px-4 py-3 backdrop-blur-xl will-change-transform"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                            Step 1
                          </p>
                          <p className="mt-1 text-sm text-white">Assign the right owner</p>
                        </div>

                        <div
                          data-float
                          className="ml-auto max-w-[250px] rounded-2xl border border-white/10 bg-[rgba(18,25,42,0.76)] px-4 py-3 backdrop-blur-xl will-change-transform"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                            Step 2
                          </p>
                          <p className="mt-1 text-sm text-white">Keep workspace members aligned</p>
                        </div>

                        <div
                          data-float
                          className="ml-8 max-w-[220px] rounded-2xl border border-white/10 bg-[rgba(18,25,42,0.76)] px-4 py-3 backdrop-blur-xl will-change-transform"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
                            Step 3
                          </p>
                          <p className="mt-1 text-sm text-white">Execute with cleaner visibility</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Multi-tenant workspaces",
              text: "Structured workspace isolation for modern business teams.",
              icon: Layers3,
            },
            {
              title: "Execution-first automation",
              text: "Workflows designed around real operational movement.",
              icon: Blocks,
            },
            {
              title: "Insight-ready architecture",
              text: "Signals, analytics, and activity visibility that scale.",
              icon: Activity,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
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
