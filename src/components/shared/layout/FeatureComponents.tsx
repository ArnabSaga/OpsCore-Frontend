"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  FileSpreadsheet,
  FolderKanban,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type CapabilityCard = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  chips: string[];
};

const coreCapabilities: CapabilityCard[] = [
  {
    title: "Workspace control",
    description:
      "Create structured multi-tenant workspaces with cleaner ownership, visibility, and operational flow across teams.",
    icon: Layers3,
    chips: ["Multi-tenant", "Role-aware", "Structured"],
  },
  {
    title: "Project execution",
    description:
      "Run projects, tasks, and delivery movement from one clear workspace system designed for execution-first teams.",
    icon: FolderKanban,
    chips: ["Projects", "Tasks", "Workflow"],
  },
  {
    title: "Billing visibility",
    description:
      "Connect invoices, payment flow, and operational activity into one premium billing-ready layer.",
    icon: CreditCard,
    chips: ["Invoices", "Revenue", "Status flow"],
  },
  {
    title: "Operational insights",
    description:
      "Turn day-to-day activity into actionable signals with analytics, reporting, and clearer business visibility.",
    icon: BarChart3,
    chips: ["Reports", "Signals", "Performance"],
  },
];

const automationSignals = [
  {
    title: "Assign ownership instantly",
    text: "OpsCore keeps responsibilities visible across tasks and workspace activity.",
    icon: Users2,
  },
  {
    title: "Track execution in motion",
    text: "Monitor movement from planning to completion with clearer operational context.",
    icon: Workflow,
  },
  {
    title: "Connect billing to delivery",
    text: "Keep invoices and execution layers closer for more dependable operational control.",
    icon: FileSpreadsheet,
  },
];

const securityPillars = [
  {
    title: "Role-aware access",
    description:
      "Structure who can see, manage, and operate within each workspace without losing speed.",
    icon: LockKeyhole,
  },
  {
    title: "Workspace-secured flow",
    description:
      "Keep data and operational movement aligned to the right environment from the start.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable control",
    description:
      "Designed for teams that need premium clarity as projects, members, and billing complexity grow.",
    icon: BriefcaseBusiness,
  },
];

const heroTags = ["Multi-tenant", "Projects", "Execution", "Billing", "Insights", "Security"];

function SectionShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-[#0C111D] text-white", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
        <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-[#6941C6]/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[#7F56D9]/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[80px_80px] sm:bg-size-[100px_100px] lg:bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(16,24,40,0.72)] shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
        "sm:rounded-[26px] lg:rounded-[30px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
      {children}
    </div>
  );
}

function FeatureHero() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/5 px-4 py-2 text-[11px] font-medium text-[#E4DFFF] backdrop-blur-xl sm:text-sm">
        <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
        OpsCore Features
      </Badge>

      <h1 className="mt-6 max-w-6xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[4.4rem] xl:text-[5.2rem]">
        Everything you need to
        <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
          run modern business operations
        </span>
      </h1>

      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
        OpsCore brings workspaces, execution, billing, analytics, and business coordination into one
        structured platform built for speed, clarity, and scale.
      </p>

      <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {heroTags.map((item) => (
          <div
            key={item}
            data-float
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-xs backdrop-blur-xl sm:text-sm"
          >
            <span className="font-medium text-white">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        <Button
          asChild
          className={cn(
            "h-12 rounded-full border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-6 text-sm font-semibold text-white",
            "shadow-[0_16px_40px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_44px_rgba(127,86,217,0.38)]"
          )}
        >
          <Link href="/register" className="inline-flex items-center gap-2">
            Start with OpsCore
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-12 rounded-full px-4 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
        >
          <Link href="/pricing" className="inline-flex items-center gap-2">
            Explore pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function CoreCapabilitiesSection() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
          Core capabilities
        </p>

        <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.4rem] lg:text-[2.6rem]">
          Built around the way serious teams actually operate
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
          Every layer of OpsCore is designed to reduce fragmentation and create a cleaner operating
          rhythm across teams, workspaces, and business flow.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {coreCapabilities.map((item) => {
          const Icon = item.icon;

          return (
            <GlassCard
              key={item.title}
              className="group p-5 sm:p-6 transition-[border-color,box-shadow,background-color,transform] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)]"
            >
              <div
                data-glow
                className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#8E72FF]/18 opacity-75 blur-3xl"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

              <div className="relative">
                <div className="mb-5 w-fit rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function AutomationSection() {
  return (
    <div className="mt-16 grid gap-4 sm:gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
      <GlassCard className="p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-[#7F56D9]/16 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_30%,rgba(255,255,255,0.02)_100%)]" />

        <div className="relative">
          <div className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4B5FD]">
            Feature block 02
          </div>

          <h2 className="mt-8 max-w-2xl text-[1.9rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2.3rem] lg:text-[2.5rem]">
            Automation that supports execution,
            <span className="block text-[#D8CCFF]">not just visibility</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
            OpsCore helps teams structure real work movement through ownership, workflow discipline,
            and cleaner handoff visibility across the business.
          </p>

          <div className="mt-8 grid gap-4">
            {automationSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div
                  key={signal.title}
                  data-float
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-white">{signal.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{signal.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-x-10 top-10 h-24 rounded-full bg-[#8E72FF]/22 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4B5FD]">
                OpsCore signal layer
              </p>
              <p className="text-sm text-white/60">Operational movement preview</p>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { label: "Workspace activity", value: "Live", icon: Layers3 },
              { label: "Execution status", value: "Tracked", icon: CheckCircle2 },
              { label: "Revenue visibility", value: "Connected", icon: CreditCard },
              { label: "Business context", value: "Readable", icon: Blocks },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  data-float
                  className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-[rgba(12,17,29,0.44)] px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/5 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-white/85">{item.label}</span>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm leading-7 text-[#D0D5DD] sm:leading-8">
              OpsCore is not a generic dashboard layer. It is designed to help businesses structure
              movement across workspaces, execution, billing, and decision flow in one premium
              environment.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="mt-20 sm:mt-24">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
          Trust and control
        </p>

        <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.4rem] lg:text-[2.6rem]">
          Designed for teams that need premium operational confidence
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
          OpsCore helps teams scale with stronger workspace boundaries, clearer collaboration flow,
          and more confident operational management.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {securityPillars.map((item) => {
          const Icon = item.icon;

          return (
            <GlassCard
              key={item.title}
              className="p-5 sm:p-6 transition-[border-color,box-shadow,background-color,transform] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)]"
            >
              <div
                data-glow
                className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-[#8E72FF]/18 opacity-75 blur-3xl"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

              <div className="relative">
                <div className="mb-5 w-fit rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="mt-20 sm:mt-24">
      <GlassCard className="px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

        <div className="relative flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-[2.6rem] lg:text-[3rem]">
            Ready to choose a cleaner operating system for your team?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
            Bring your projects, execution, billing, and workspace coordination into one premium
            operating layer with OpsCore.
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
                Get started now
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
      </GlassCard>
    </div>
  );
}

export default function FeatureComponents() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesRef = useRef<HTMLDivElement | null>(null);
  const automationRef = useRef<HTMLDivElement | null>(null);
  const securityRef = useRef<HTMLDivElement | null>(null);
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
              scale: 0.985,
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
                ...(capabilitiesRef.current ? Array.from(capabilitiesRef.current.children) : []),
                ...(automationRef.current ? Array.from(automationRef.current.children) : []),
                ...(securityRef.current ? Array.from(securityRef.current.children) : []),
                ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
              ],
              { opacity: 1, y: 0, scale: 1, clearProps: "all" }
            );
            return;
          }

          revealSection(heroRef.current, 26);
          revealSection(capabilitiesRef.current, 28);
          revealSection(automationRef.current, 28);
          revealSection(securityRef.current, 28);
          revealSection(ctaRef.current, 24);

          if (desktop) {
            const floatingNodes = gsap.utils.toArray<HTMLElement>("[data-float]", section);

            floatingNodes.forEach((node, index) => {
              gsap.to(node, {
                y: index % 2 === 0 ? -6 : 6,
                x: index % 2 === 0 ? 4 : -4,
                duration: 3.2 + index * 0.18,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            });

            const glowEls = gsap.utils.toArray<HTMLElement>("[data-glow]", section);
            if (glowEls.length) {
              gsap.to(glowEls, {
                opacity: 0.92,
                scale: 1.06,
                duration: 3.2,
                repeat: -1,
                yoyo: true,
                stagger: 0.12,
                ease: "sine.inOut",
              });
            }
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
    <SectionShell className="py-16 sm:py-20 lg:py-24 xl:py-28">
      <div ref={sectionRef}>
        <div ref={heroRef}>
          <FeatureHero />
        </div>

        <div ref={capabilitiesRef}>
          <CoreCapabilitiesSection />
        </div>

        <div ref={automationRef}>
          <AutomationSection />
        </div>

        <div ref={securityRef}>
          <SecuritySection />
        </div>

        <div ref={ctaRef}>
          <CTASection />
        </div>
      </div>
    </SectionShell>
  );
}
