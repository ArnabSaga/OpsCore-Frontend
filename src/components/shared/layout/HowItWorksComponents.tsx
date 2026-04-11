"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CreditCard,
  Layers3,
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

type StepItem = {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
};

const processSteps: StepItem[] = [
  {
    step: "01",
    title: "Create the workspace foundation",
    description:
      "Start by structuring your workspace with the right teams, ownership, and visibility layers. OpsCore gives your operation a cleaner system from the beginning.",
    icon: Layers3,
    tags: ["Workspace", "Structure", "Access"],
  },
  {
    step: "02",
    title: "Run projects and execution flow",
    description:
      "Move work through projects, tasks, and handoffs with clear ownership. Teams can coordinate execution without losing visibility or momentum.",
    icon: Workflow,
    tags: ["Projects", "Tasks", "Execution"],
  },
  {
    step: "03",
    title: "Connect billing and business flow",
    description:
      "Bring invoices, revenue visibility, and operational finance closer to daily execution so teams can manage work and business movement together.",
    icon: CreditCard,
    tags: ["Billing", "Invoices", "Revenue"],
  },
  {
    step: "04",
    title: "Improve with operational insight",
    description:
      "Use analytics and activity signals to understand performance, unblock execution, and create a more confident operating rhythm across the workspace.",
    icon: BarChart3,
    tags: ["Insights", "Analytics", "Optimization"],
  },
];

const featureHighlights = [
  {
    title: "Structured from the start",
    description:
      "OpsCore helps teams begin with a cleaner workspace foundation instead of growing through disconnected tools.",
    icon: ShieldCheck,
  },
  {
    title: "Built for serious execution",
    description:
      "Projects, tasks, ownership, and team movement stay visible and easier to manage in one operational layer.",
    icon: CheckCircle2,
  },
  {
    title: "Aligned with real business flow",
    description:
      "Billing, analytics, and team coordination work together inside one premium platform experience.",
    icon: BrainCircuit,
  },
];

const workflowSignals = [
  {
    title: "Input layer",
    description: "Bring teams, processes, and operational ownership into one structured workspace.",
    icon: Users2,
  },
  {
    title: "Execution layer",
    description: "Track projects, tasks, handoffs, and workflow progress with more clarity.",
    icon: Bot,
  },
  {
    title: "Optimization layer",
    description:
      "Use visibility, reporting, and insights to improve how operations move over time.",
    icon: Sparkles,
  },
];

const heroTags = ["Workspace", "Execution", "Billing", "Insights", "Coordination"];

function SectionGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
      <div className="absolute -left-24 top-40 h-64 w-64 rounded-full bg-[#6941C6]/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#7F56D9]/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[80px_80px] sm:bg-size-[100px_100px] lg:bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
    </div>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(16,24,40,0.72)] shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl",
        "sm:rounded-[26px] lg:rounded-[30px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
      {children}
    </div>
  );
}

export default function HowItWorksComponents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const workflowRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
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
                ...(stepsRef.current ? Array.from(stepsRef.current.children) : []),
                ...(workflowRef.current ? Array.from(workflowRef.current.children) : []),
                ...(highlightRef.current ? Array.from(highlightRef.current.children) : []),
                ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
              ],
              { opacity: 1, y: 0, clearProps: "all" }
            );
            return;
          }

          revealSection(heroRef.current, 26);
          revealSection(stepsRef.current, 28);
          revealSection(workflowRef.current, 28);
          revealSection(highlightRef.current, 28);
          revealSection(ctaRef.current, 24);

          if (desktop) {
            const floatingNodes = gsap.utils.toArray<HTMLElement>("[data-float]", section);

            floatingNodes.forEach((node, index) => {
              gsap.to(node, {
                y: index % 2 === 0 ? -6 : 6,
                x: index % 2 === 0 ? 4 : -4,
                duration: 3.4 + index * 0.18,
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
      id="how-it-works-page"
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
            How It Works
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.8rem] lg:text-[4.25rem] xl:text-[5rem]">
            How OpsCore powers
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              modern business execution
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
            OpsCore helps teams organize the workspace, run execution flow, connect billing
            visibility, and improve operations through clearer structure and insight.
          </p>

          <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="mb-16 grid gap-5 sm:mb-20 sm:gap-6">
          {processSteps.map((item, index) => {
            const Icon = item.icon;
            const isReverse = index % 2 === 1;

            return (
              <GlassCard
                key={item.step}
                className={cn(
                  "grid gap-6 p-5 sm:p-7 xl:grid-cols-[0.3fr_1fr]",
                  isReverse && "xl:grid-cols-[1fr_0.3fr]"
                )}
              >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[#8E72FF]/16 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/45 to-transparent" />

                <div
                  className={cn(
                    "relative flex items-start justify-between gap-4 xl:flex-col xl:justify-start",
                    isReverse && "xl:order-2"
                  )}
                >
                  <div className="w-fit rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="rounded-full border border-[#7F56D9]/50 bg-[rgba(12,17,29,0.42)] px-4 py-2 text-sm font-semibold text-white">
                    Step {item.step}
                  </div>
                </div>

                <div className={cn("relative", isReverse && "xl:order-1")}>
                  <h2 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2rem] lg:text-[2.2rem]">
                    {item.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur-xl"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {["Cleaner ownership", "Better visibility", "Premium control"].map(
                      (benefit) => (
                        <div
                          key={benefit}
                          className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#D0D5DD] backdrop-blur-xl"
                        >
                          {benefit}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Workflow explanation */}
        <div
          ref={workflowRef}
          className="mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center sm:mb-16 lg:mb-20"
        >
          <GlassCard className="p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Workflow logic
              </p>

              <h2 className="mt-4 text-[1.8rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2rem] lg:text-[2.2rem]">
                OpsCore is built around three connected operating layers
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                Instead of treating operations as isolated tools, OpsCore connects structure,
                execution, and optimization into a more unified system.
              </p>
            </div>
          </GlassCard>

          <div className="grid gap-4">
            {workflowSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div ref={highlightRef} className="mb-12 grid gap-4 sm:gap-6 md:grid-cols-3">
          {featureHighlights.map((item) => {
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
                Start with OpsCore and create a more connected path from workspace structure to
                execution, billing visibility, and operational clarity.
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
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Request a walkthrough
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
