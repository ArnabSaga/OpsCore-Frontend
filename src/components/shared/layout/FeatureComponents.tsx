"use client";

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
import { useEffect, useRef } from "react";

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

function SectionShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-[#0C111D] text-white", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
        <div className="absolute -left-20 top-44 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function FeatureHero() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
        <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
        OpsCore Features
      </Badge>

      <h1 className="mt-6 max-w-6xl text-[2rem] font-semibold leading-[1.15] tracking-[-0.04em] text-white sm:text-[3rem] sm:leading-[1.02] lg:text-[5.2rem]">
        Everything you need to
        <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
          run modern business operations
        </span>
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
        OpsCore brings workspaces, execution, billing, analytics, and business coordination into one
        structured platform built for speed, clarity, and scale.
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

function CoreCapabilitiesSection({
  cardRefs,
}: {
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <div className="mt-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
          Core capabilities
        </p>
        <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.6rem]">
          Built around the way serious teams actually operate
        </h2>
        <p className="mt-4 text-sm leading-8 text-[#94A3B8] sm:text-base">
          Every layer of OpsCore is designed to reduce fragmentation and create a cleaner operating
          rhythm across teams, workspaces, and business flow.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {coreCapabilities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-[22px] p-4 sm:rounded-[26px] sm:p-5 lg:rounded-[28px] lg:p-6 border border-white/10 bg-[rgba(16,24,40,0.72)] shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)]"
            >
              <div
                data-glow
                className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#8E72FF]/18 opacity-80 blur-3xl"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

              <div className="relative">
                <div className="mb-5 rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF] w-fit">
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
                      className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-white/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AutomationSection({
  leftRef,
  rightRef,
}: {
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="mt-16 grid gap-4 sm:gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
      <div
        ref={leftRef}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(16,24,40,0.74)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-[#7F56D9]/16 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_30%,rgba(255,255,255,0.02)_100%)]" />

        <div className="relative">
          <div className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4B5FD] w-fit">
            Feature block 02
          </div>

          <h2 className="mt-8 max-w-2xl text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2.5rem]">
            Automation that supports execution,
            <span className="block text-[#D8CCFF]">not just visibility</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#94A3B8] sm:text-base">
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
                  className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl"
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
      </div>

      <div
        ref={rightRef}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(16,24,40,0.74)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-10 top-10 h-24 rounded-full bg-[#8E72FF]/22 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
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
              {
                label: "Workspace activity",
                value: "Live",
                icon: Layers3,
              },
              {
                label: "Execution status",
                value: "Tracked",
                icon: CheckCircle2,
              },
              {
                label: "Revenue visibility",
                value: "Connected",
                icon: CreditCard,
              },
              {
                label: "Business context",
                value: "Readable",
                icon: Blocks,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  data-float
                  className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[rgba(12,17,29,0.44)] px-5 py-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/4 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-white/85">{item.label}</span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-semibold text-white/80">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/3 p-5 backdrop-blur-xl">
            <p className="text-sm leading-8 text-[#D0D5DD]">
              OpsCore is not a generic dashboard layer. It is designed to help businesses structure
              movement across workspaces, execution, billing, and decision flow in one premium
              environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySection({ refs }: { refs: React.MutableRefObject<(HTMLDivElement | null)[]> }) {
  return (
    <div className="mt-24">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
          Trust and control
        </p>
        <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.6rem]">
          Designed for teams that need premium operational confidence
        </h2>
        <p className="mt-4 text-sm leading-8 text-[#94A3B8] sm:text-base">
          OpsCore helps teams scale with stronger workspace boundaries, clearer collaboration flow,
          and more confident operational management.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {securityPillars.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="relative overflow-hidden rounded-[22px] p-4 sm:rounded-[26px] sm:p-5 lg:rounded-[28px] lg:p-6 border border-white/10 bg-[rgba(16,24,40,0.72)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)]"
            >
              <div
                data-glow
                className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-[#8E72FF]/18 opacity-80 blur-3xl"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

              <div className="relative">
                <div className="mb-5 rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF] w-fit">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CTASection({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={ctaRef} className="mt-24">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(16,24,40,0.76)] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

        <div className="relative flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.15] tracking-[-0.04em] text-white sm:text-[3rem] sm:leading-[1.02]">
            Ready to choose a cleaner operating system for your team?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#94A3B8] sm:text-base">
            Bring your projects, execution, billing, and workspace coordination into one premium
            operating layer with OpsCore.
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
      </div>
    </div>
  );
}

export default function FeatureComponents() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const automationLeftRef = useRef<HTMLDivElement | null>(null);
  const automationRightRef = useRef<HTMLDivElement | null>(null);
  const securityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startFloating = (node: Element, index: number) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 2.8 + index * 0.12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: "auto",
        });
      };

      const reveal = (trigger: HTMLElement | null, start: string = "top 84%") => {
        if (!trigger) return;
        const elements = Array.from(trigger.children);

        gsap.fromTo(
          elements,
          { opacity: 0, y: 30, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            stagger: 0.1,
            ease: "expo.out",
            force3D: true,
            overwrite: "auto",
            scrollTrigger: {
              trigger,
              start,
              once: true,
            },
            onComplete: () => {
              elements.forEach((el, index) => {
                if (el.hasAttribute("data-float")) {
                  startFloating(el, index);
                }
                const floatingChildren = el.querySelectorAll("[data-float]");
                floatingChildren.forEach((child, cIndex) => {
                  startFloating(child, cIndex);
                });
              });
            },
          }
        );
      };

      reveal(heroRef.current);
      reveal(
        capabilitiesRefs.current[0]?.parentElement as HTMLElement | null,
        "top 82%"
      );
      reveal(automationLeftRef.current?.parentElement as HTMLElement | null, "top 82%");
      reveal(securityRefs.current[0]?.parentElement as HTMLElement | null, "top 84%");
      reveal(ctaRef.current, "top 88%");

      const glowEls = section.querySelectorAll("[data-glow]");
      if (glowEls.length) {
        gsap.to(glowEls, {
          opacity: 0.95,
          scale: 1.08,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          stagger: 0.12,
          ease: "sine.inOut",
          force3D: true,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell className="py-16 sm:py-20 lg:py-24">
      <div ref={sectionRef}>
        <div ref={heroRef}>
          <FeatureHero />
        </div>

        <CoreCapabilitiesSection cardRefs={capabilitiesRefs} />

        <AutomationSection leftRef={automationLeftRef} rightRef={automationRightRef} />

        <SecuritySection refs={securityRefs} />

        <CTASection ctaRef={ctaRef} />
      </div>
    </SectionShell>
  );
}
