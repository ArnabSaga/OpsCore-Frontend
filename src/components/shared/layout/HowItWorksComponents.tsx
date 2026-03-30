"use client";

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
import { useEffect, useRef } from "react";

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

export default function HowItWorksComponents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const workflowRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const steps = stepsRef.current;
    const workflow = workflowRef.current;
    const highlight = highlightRef.current;
    const cta = ctaRef.current;

    if (!section || !hero || !steps || !workflow || !highlight || !cta) return;

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
      reveal(Array.from(steps.children), steps);
      reveal(Array.from(workflow.children), workflow);
      reveal(Array.from(highlight.children), highlight);
      reveal(Array.from(cta.children), cta);

      const floatingNodes = section.querySelectorAll("[data-float]");
      floatingNodes.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -8 : 8,
          duration: 3 + index * 0.18,
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
      id="how-it-works-page"
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
            <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
            How It Works
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[5rem]">
            A cleaner way to move
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              from structure to execution
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            OpsCore helps teams organize the workspace, run execution flow, connect billing
            visibility, and improve operations through clearer structure and insight.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Workspace", "Execution", "Billing", "Insights", "Coordination"].map((item) => (
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

        {/* 2. Main process steps */}
        <div ref={stepsRef} className="mb-16 grid gap-6 sm:mb-20">
          {processSteps.map((item, index) => {
            const Icon = item.icon;
            const isReverse = index % 2 === 1;

            return (
              <div
                key={item.step}
                data-float
                className={cn(
                  "relative grid gap-6 overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[0.3fr_1fr]",
                  isReverse && "lg:grid-cols-[1fr_0.3fr]"
                )}
              >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[#8E72FF]/16 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/45 to-transparent" />

                <div
                  className={cn(
                    "relative flex items-start justify-between lg:flex-col lg:justify-start",
                    isReverse && "lg:order-2"
                  )}
                >
                  <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF] w-fit">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="rounded-full border border-[#7F56D9]/50 bg-[rgba(12,17,29,0.42)] px-4 py-2 text-sm font-semibold text-white">
                    Step {item.step}
                  </div>
                </div>

                <div className={cn("relative", isReverse && "lg:order-1")}>
                  <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                    {item.title}
                  </h2>

                  <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-white/85 backdrop-blur-xl"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {["Cleaner ownership", "Better visibility", "Premium control"].map(
                      (benefit) => (
                        <div
                          key={benefit}
                          className="rounded-[20px] border border-white/10 bg-white/3 px-4 py-4 text-sm text-[#D0D5DD] backdrop-blur-xl"
                        >
                          {benefit}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Workflow explanation strip */}
        <div
          ref={workflowRef}
          className="mb-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center sm:mb-20"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Workflow logic
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                OpsCore is built around three connected operating layers
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                Instead of treating operations as isolated tools, OpsCore connects structure,
                execution, and optimization into a more unified system.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {workflowSignals.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-float
                  className="rounded-[24px] border border-white/10 bg-white/3 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
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

        {/* 4. Why it works / value */}
        <div ref={highlightRef} className="mb-12 grid gap-6 md:grid-cols-3">
          {featureHighlights.map((item) => {
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

        {/* 5. CTA */}
        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.76)] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem]">
                Ready to see how OpsCore works inside a real team workflow?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Start with OpsCore and create a more connected path from workspace structure to
                execution, billing visibility, and operational clarity.
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
                    Request a walkthrough
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
