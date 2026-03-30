"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BrainCircuit, Play, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEP_1_IMAGE = "/image/work-process-step-1.png";
const PROCESS_STEP_2_IMAGE = "/image/work-process-step-2.png";
const PROCESS_STEP_3_IMAGE = "/image/work-process-step-3.png";

type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  tagA: string;
  tagB: string;
  imageSrc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const processSteps: ProcessStep[] = [
  {
    id: "intelligence",
    step: "Step 01",
    title: "Input Intelligence",
    description:
      "Connect your tools, teams, and workflows into one structured workspace. OpsCore turns scattered operational signals into a clearer execution foundation.",
    tagA: "Workspace",
    tagB: "Structure",
    imageSrc: PROCESS_STEP_1_IMAGE,
    icon: BrainCircuit,
  },
  {
    id: "execution",
    step: "Step 02",
    title: "Autonomous Execution",
    description:
      "Turn planning into movement with coordinated tasks, ownership, and operational flow. OpsCore helps teams execute with more consistency and visibility.",
    tagA: "Execution",
    tagB: "Coordination",
    imageSrc: PROCESS_STEP_2_IMAGE,
    icon: Workflow,
  },
  {
    id: "optimization",
    step: "Step 03",
    title: "Smart Optimization",
    description:
      "Refine workflows with better visibility across performance, blockers, and business flow. OpsCore helps teams improve execution with more operational clarity.",
    tagA: "Insights",
    tagB: "Optimization",
    imageSrc: PROCESS_STEP_3_IMAGE,
    icon: ShieldCheck,
  },
];

export default function WorkProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!header || !cards.length) return;

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2. Cards Scroll-Reveal Animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        // Ambient elements within the card
        const glow = card.querySelector("[data-step-glow]");
        const preview = card.querySelector("[data-step-preview]");

        if (glow) {
          gsap.to(glow, {
            opacity: 0.95,
            scale: 1.06,
            duration: 3 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (preview) {
          gsap.to(preview, {
            yPercent: -2.5,
            duration: 2.8 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative my-14 overflow-hidden bg-[#0C111D] py-24 text-white sm:py-28"
    >
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
        <div className="absolute -left-24 top-48 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-12 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.6),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="mx-auto mb-20 flex max-w-4xl flex-col items-center text-center sm:mb-24"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <Sparkles className="mr-2 h-4 w-4 text-[#7F56D9]" />
            Work Process
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[3.7rem] lg:text-[4.6rem]">
            From setup to execution
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              in one premium operational flow
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            OpsCore helps teams structure workspaces, coordinate execution, and improve operational
            clarity through a smoother workflow system.
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
                Start with OpsCore
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/12 bg-white/4 px-6 text-sm text-white backdrop-blur-xl hover:bg-white/8 hover:text-white"
            >
              <Link href="/features" className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                Explore workflow
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Vertical Card Stack ── */}
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 sm:gap-14 lg:gap-24">
          {processSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "relative w-full rounded-[32px] border border-white/10 bg-[rgba(16,24,40,0.6)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8 lg:p-10",
                  "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]",
                  "max-w-4xl mx-auto"
                )}
              >
                {/* Glow + decorative overlays */}
                <div
                  data-step-glow
                  className="pointer-events-none absolute inset-x-12 bottom-0 h-24 rounded-full bg-[#8E72FF]/18 opacity-80 blur-3xl"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/40 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.06),transparent_40%,rgba(255,255,255,0.01)_100%)]" />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                  {/* Left: Content Area */}
                  <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-2xl bg-white/4 p-4 text-[#DCCFFF] shadow-inner ring-1 ring-white/10">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="rounded-full border border-[#7F56D9]/50 bg-[#0C111D]/60 px-5 py-2 text-sm font-bold tracking-wide text-white uppercase backdrop-blur-md">
                        {item.step}
                      </div>
                    </div>

                    <h3 className="text-[1.85rem] font-bold leading-tight tracking-tight text-white sm:text-[2.2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-white/5 pt-7">
                      <div className="rounded-full border border-white/10 bg-white/4 px-5 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm">
                        {item.tagA}
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/4 px-5 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm">
                        {item.tagB}
                      </div>
                    </div>
                  </div>

                  {/* Right: Premium Image Preview */}
                  <div
                    data-step-preview
                    className="group relative flex-1 overflow-hidden rounded-[24px] border border-white/10 bg-[#0B1220] shadow-2xl"
                  >
                    <div className="relative aspect-auto min-h-[280px] sm:min-h-[340px]">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      />
                      {/* Subtle Overlay Gradients */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,18,0.05),transparent_20%,rgba(7,10,18,0.3))]" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0C111D]/60 to-transparent" />
                    </div>
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
