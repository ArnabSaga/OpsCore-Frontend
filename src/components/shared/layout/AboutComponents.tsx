"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Building2,
  CheckCircle2,
  CreditCard,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Operational clarity",
    description:
      "OpsCore is built to reduce fragmentation across workspaces, teams, and execution layers so businesses can operate with more confidence.",
    icon: Target,
  },
  {
    title: "Structured execution",
    description:
      "We focus on turning plans into visible, accountable progress through projects, task flow, and role-aware collaboration.",
    icon: Workflow,
  },
  {
    title: "Business-ready control",
    description:
      "From billing visibility to workspace security, every layer is designed for modern teams that need order without friction.",
    icon: ShieldCheck,
  },
];

const platformPillars = [
  {
    title: "Workspace architecture",
    description:
      "Multi-tenant foundations that keep operations structured across teams, ownership, and organizational flow.",
    icon: Layers3,
  },
  {
    title: "Execution engine",
    description:
      "Projects, tasks, handoffs, and delivery visibility designed to support daily operational movement.",
    icon: Blocks,
  },
  {
    title: "Billing visibility",
    description:
      "Operational finance, invoice flow, and revenue awareness integrated into the broader business picture.",
    icon: CreditCard,
  },
  {
    title: "Analytics and insight",
    description:
      "A cleaner way to understand progress, performance, blockers, and business signals across the workspace.",
    icon: BarChart3,
  },
];

const stats = [
  { value: "Projects", label: "Execution-first coordination" },
  { value: "Tasks", label: "Clear ownership and movement" },
  { value: "Billing", label: "Operational finance visibility" },
  { value: "Insights", label: "Signals for better decisions" },
];

const outcomes = [
  "Bring projects, tasks, billing, and visibility into one operational layer.",
  "Reduce scattered execution and create cleaner team coordination.",
  "Give growing businesses a more structured system for daily operations.",
  "Support serious teams with a premium interface and scalable workflow logic.",
];

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

export default function AboutComponents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const outcomesRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startFloating = (node: Element, index: number) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 3 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: "auto",
        });
      };

      const reveal = (trigger: HTMLElement | null) => {
        if (!trigger) return;
        const elements = Array.from(trigger.children);

        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "expo.out",
            force3D: true,
            overwrite: "auto",
            scrollTrigger: {
              trigger,
              start: "top 84%",
              once: true,
            },
            onComplete: () => {
              elements.forEach((el, index) => {
                if (el.hasAttribute("data-float")) {
                  startFloating(el, index);
                }
              });
            },
          }
        );
      };

      reveal(heroRef.current);
      reveal(storyRef.current);
      reveal(pillarsRef.current);
      reveal(outcomesRef.current);
      reveal(ctaRef.current);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#0C111D] py-16 text-white sm:py-20 lg:py-24"
    >
      <SectionGlow />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Hero / Intro */}
        <div
          ref={heroRef}
          className="mx-auto mb-16 flex max-w-5xl flex-col items-center text-center sm:mb-20"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
            About OpsCore
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[2.9rem] lg:text-[5rem]">
            A premium operating system
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              for modern business execution
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            OpsCore is designed for teams that need more than isolated tools. We bring workspaces,
            execution flow, billing visibility, and operational clarity into one structured platform
            built for real business movement.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stats.map((item) => (
              <div
                key={item.value}
                data-float
                className="rounded-full border border-white/10 bg-white/3 px-3 py-2 text-xs sm:px-4 sm:text-sm backdrop-blur-xl"
              >
                <span className="font-semibold text-white">{item.value}</span>
                <span className="ml-2 text-[#94A3B8]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Story / Why OpsCore */}
        <div
          ref={storyRef}
          className="mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch sm:mb-16 lg:mb-20"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Why we built OpsCore
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                Business operations deserve more structure, not more fragmentation.
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                Too many teams manage work across disconnected tools that separate execution,
                ownership, billing, and visibility. OpsCore was created to unify these layers into a
                cleaner operating experience—one that feels structured, scalable, and ready for
                serious business use.
              </p>
              <p className="mt-4 text-sm leading-8 text-[#94A3B8] sm:text-base">
                We focus on helping teams create momentum with clearer workflows, stronger
                operational visibility, and a premium environment that supports real
                coordination—not just isolated task tracking.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-white/3 p-5 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">Built for teams</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                        Designed for operators, managers, founders, and business teams.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/3 p-5 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">Built for flow</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                        Created to support structure, execution, and operational momentum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                className="relative overflow-hidden rounded-[22px] p-4 sm:rounded-[26px] sm:p-5 lg:rounded-[28px] lg:p-6 border border-white/10 bg-[rgba(16,24,40,0.68)] shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />

                  <div className="relative flex items-start gap-4">
                    <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Platform Pillars */}
        <div ref={pillarsRef} className="mb-16 sm:mb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
              Platform pillars
            </p>
            <h2 className="mt-4 text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem]">
              Four foundations behind the OpsCore experience
            </h2>
            <p className="mt-5 text-base leading-8 text-[#94A3B8]">
              Every part of OpsCore is shaped around how modern teams actually operate: structure,
              execution, visibility, and scalable control.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                className="relative overflow-hidden rounded-[22px] p-4 sm:rounded-[26px] sm:p-5 lg:rounded-[28px] lg:p-6 border border-white/10 bg-[rgba(16,24,40,0.7)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
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
        </div>

        {/* 4. Outcomes / CTA */}
        <div
          ref={outcomesRef}
          className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                What teams gain
              </p>
              <h3 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                More order, better execution, and stronger operational confidence.
              </h3>
              <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                OpsCore is not just about tracking work. It is about helping teams build a cleaner,
                more dependable system for how business actually runs.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                    <Users2 className="h-5 w-5" />
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
                Ready to build a cleaner operating layer for your team?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Explore OpsCore and see how structured workspaces, execution flow, billing
                visibility, and operational clarity can come together in one premium system.
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
                  <Link href="/features" className="inline-flex items-center gap-2">
                    Explore features
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
