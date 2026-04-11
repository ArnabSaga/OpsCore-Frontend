"use client";

import { useGSAP } from "@gsap/react";
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
import { useRef } from "react";

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
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
      <div className="absolute -left-24 top-40 h-64 w-64 rounded-full bg-[#6941C6]/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#7F56D9]/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,18,0.14),rgba(12,17,29,0.2),rgba(12,17,29,0.34))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[80px_80px] sm:bg-size-[100px_100px] lg:bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
    </div>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(16,24,40,0.7)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
        "sm:rounded-[26px] lg:rounded-[30px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
      {children}
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

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions ?? {};

          const revealSection = (node: HTMLElement | null, y = 24) => {
            if (!node) return;

            const elements = Array.from(node.children);

            gsap.from(elements, {
              opacity: 0,
              y,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: node,
                start: "top 84%",
                once: true,
              },
            });
          };

          if (reduceMotion) {
            gsap.set(
              [
                ...(heroRef.current ? Array.from(heroRef.current.children) : []),
                ...(storyRef.current ? Array.from(storyRef.current.children) : []),
                ...(pillarsRef.current ? Array.from(pillarsRef.current.children) : []),
                ...(outcomesRef.current ? Array.from(outcomesRef.current.children) : []),
                ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
              ],
              {
                opacity: 1,
                y: 0,
                clearProps: "all",
              }
            );
            return;
          }

          revealSection(heroRef.current, 26);
          revealSection(storyRef.current, 28);
          revealSection(pillarsRef.current, 28);
          revealSection(outcomesRef.current, 24);
          revealSection(ctaRef.current, 24);

          if (desktop) {
            const floatingNodes = gsap.utils.toArray<HTMLElement>("[data-float]", section);

            floatingNodes.forEach((node, index) => {
              gsap.to(node, {
                y: index % 2 === 0 ? -6 : 6,
                x: index % 2 === 0 ? 4 : -4,
                duration: 4 + index * 0.25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            });
          }
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#0C111D] py-16 text-white sm:py-20 lg:py-24 xl:py-28"
    >
      <SectionGlow />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div
          ref={heroRef}
          className="mx-auto mb-14 flex max-w-5xl flex-col items-center text-center sm:mb-16 lg:mb-20"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/5 px-4 py-2 text-[11px] font-medium text-[#E4DFFF] backdrop-blur-xl sm:text-sm">
            <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
            About OpsCore
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.8rem] lg:text-[4.25rem] xl:text-[5rem]">
            A premium operating system
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              for modern business execution
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
            OpsCore is designed for teams that need more than isolated tools. We bring workspaces,
            execution flow, billing visibility, and operational clarity into one structured platform
            built for real business movement.
          </p>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.value}
                data-float
                className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-xs backdrop-blur-xl sm:text-sm"
              >
                <span className="font-semibold text-white">{item.value}</span>
                <span className="mt-1 block text-[#94A3B8] sm:inline sm:ml-2 sm:mt-0">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div
          ref={storyRef}
          className="mb-12 grid gap-4 sm:gap-6 lg:mb-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch"
        >
          <GlassCard className="p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Why we built OpsCore
              </p>

              <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.2] tracking-[-0.035em] text-white sm:text-[2rem] lg:text-[2.35rem]">
                Business operations deserve more structure, not more fragmentation.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                Too many teams manage work across disconnected tools that separate execution,
                ownership, billing, and visibility. OpsCore was created to unify these layers into a
                cleaner operating experience—one that feels structured, scalable, and ready for
                serious business use.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                We focus on helping teams create momentum with clearer workflows, stronger
                operational visibility, and a premium environment that supports real
                coordination—not just isolated task tracking.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
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

                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
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
          </GlassCard>

          <div className="grid gap-4 sm:gap-5 lg:gap-6">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <GlassCard key={item.title} className="p-5 sm:p-6">
                  <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />

                  <div className="relative flex items-start gap-4">
                    <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="mb-16 sm:mb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
              Platform pillars
            </p>

            <h2 className="mt-4 text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-[2.4rem] lg:text-[3rem]">
              Four foundations behind the OpsCore experience
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
              Every part of OpsCore is shaped around how modern teams actually operate: structure,
              execution, visibility, and scalable control.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {platformPillars.map((item) => {
              const Icon = item.icon;

              return (
                <GlassCard key={item.title} className="p-5 sm:p-6">
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-full bg-[#8E72FF]/16 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/45 to-transparent" />

                  <div className="relative">
                    <div className="w-fit rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold leading-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div
          ref={outcomesRef}
          className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <GlassCard className="p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                What teams gain
              </p>

              <h3 className="mt-4 text-[1.8rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2.2rem]">
                More order, better execution, and stronger operational confidence.
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                OpsCore is not just about tracking work. It is about helping teams build a cleaner,
                more dependable system for how business actually runs.
              </p>
            </div>
          </GlassCard>

          <div className="grid gap-4">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
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

        {/* CTA */}
        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <GlassCard className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-[2.6rem] lg:text-[3rem]">
                Ready to build a cleaner operating layer for your team?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                Explore OpsCore and see how structured workspaces, execution flow, billing
                visibility, and operational clarity can come together in one premium system.
              </p>

              <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
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
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
