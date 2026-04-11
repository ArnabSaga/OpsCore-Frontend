"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

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
    gradientClass: "from-[#7F56D9]/20 via-[#1D2939]/40 to-transparent",
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
    gradientClass: "from-[#7F56D9]/18 via-[#0F172A]/30 to-[#6941C6]/10",
  },
  {
    id: "collaboration-layer",
    title: "Team Collaboration Layer",
    description:
      "Keep members aligned with role-aware visibility, updates, shared execution context, and cleaner cross-team coordination.",
    icon: Users2,
    size: "sm",
    gradientClass: "from-[#6941C6]/16 via-[#101828]/28 to-transparent",
  },
];

const secondaryFeatures = [
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
];

export default function FeatureSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const secondaryGridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
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

          const headerItems = headerRef.current?.children
            ? Array.from(headerRef.current.children)
            : [];

          const featureCardsEls = gsap.utils.toArray<HTMLElement>(
            ".feature-card",
            containerRef.current
          );

          const secondaryCardsEls = gsap.utils.toArray<HTMLElement>(
            ".secondary-feature-card",
            containerRef.current
          );

          if (reduceMotion) {
            gsap.set([...headerItems, ...featureCardsEls, ...secondaryCardsEls], {
              opacity: 1,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            return;
          }

          gsap.from(headerItems, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          });

          gsap.from(featureCardsEls, {
            opacity: 0,
            y: desktop ? 34 : 24,
            scale: 0.985,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          });

          gsap.from(secondaryCardsEls, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: secondaryGridRef.current,
              start: "top 88%",
              once: true,
            },
          });

          if (desktop) {
            const glowTargets = gsap.utils.toArray<HTMLElement>(
              "[data-card-glow]",
              containerRef.current
            );

            const ambientTimeline = gsap.timeline({
              repeat: -1,
              yoyo: true,
              paused: true,
            });

            ambientTimeline.to(glowTargets, {
              opacity: 0.72,
              scale: 1.05,
              duration: 3.2,
              ease: "sine.inOut",
              stagger: 0.22,
            });

            ScrollTrigger.create({
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => {
                if (self.isActive) ambientTimeline.play();
                else ambientTimeline.pause();
              },
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative overflow-hidden bg-[#070910] py-20 text-white sm:py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-[24rem] -translate-x-1/2 rounded-full bg-[#7F56D9]/6 blur-[90px] sm:h-128 sm:w-xl lg:h-152 lg:w-208 lg:blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute -left-16 top-32 h-56 w-56 rounded-full bg-[#6941C6]/10 blur-3xl opacity-50 sm:h-72 sm:w-72" />
        <div className="absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-[#7F56D9]/10 blur-3xl opacity-50 sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center sm:mb-16 lg:mb-20"
        >
          <Badge className="rounded-full border border-[#7F56D9]/30 bg-[#7F56D9]/5 px-4 py-1.5 text-[11px] font-semibold text-[#C4B5FD] backdrop-blur-xl sm:text-xs">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-[#7F56D9]" />
            OpsCore Features
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:mt-8 lg:text-[4.75rem] xl:text-[5.5rem]">
            Infrastructure for
            <span className="block text-[#94A3B8]">modern operations.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:mt-6 sm:text-base md:text-lg">
            OpsCore helps teams run projects, billing, execution, insights, and workspace governance
            from one premium operating layer designed for clarity, control, and scale.
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <Button
              asChild
              className="group h-12 rounded-full bg-[#7F56D9] px-6 text-sm font-bold text-white shadow-[0_18px_36px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#6D4DC9] hover:shadow-[0_24px_46px_rgba(127,86,217,0.38)] sm:px-8"
            >
              <Link href="/register" className="inline-flex items-center justify-center gap-2">
                Explore OpsCore
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:text-white sm:px-8"
            >
              <Link href="/pricing" className="inline-flex items-center justify-center">
                See platform value
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6"
        >
          {featureCards.map((card) => {
            const Icon = card.icon;
            const isLarge = card.size === "lg";

            return (
              <motion.article
                key={card.id}
                className={cn(
                  "feature-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0F172A]/55 backdrop-blur-2xl transition-colors duration-500 hover:border-[#7F56D9]/40 sm:rounded-[28px] lg:rounded-[32px]",
                  isLarge ? "lg:col-span-8" : "lg:col-span-4"
                )}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <div
                  data-card-glow
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40 blur-[72px] transition-opacity duration-500 sm:h-48 sm:blur-[80px]",
                    "bg-linear-to-t",
                    card.gradientClass
                  )}
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.06),transparent_32%)]" />

                <div className="relative flex h-full flex-col justify-between p-5 sm:p-7 lg:p-8">
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
                      <motion.div
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#070910] text-[#C4B5FD] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] sm:h-14 sm:w-14"
                        whileHover={{ rotate: 8, scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      >
                        <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                        <Icon className="relative h-5 w-5 sm:h-6 sm:w-6" />
                      </motion.div>

                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7F56D9]/60 sm:text-[10px]">
                        Operational Logic
                      </span>
                    </div>

                    <h3 className="max-w-xl text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-[2rem]">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#94A3B8] sm:mt-4 sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-4 sm:mt-10 sm:p-5 lg:p-6">
                    {card.id === "workspace-intelligence" && (
                      <div className="space-y-3 sm:space-y-4">
                        {[
                          {
                            label: "AI signal",
                            val: "Execution risk detected",
                            color: "text-red-400",
                          },
                          {
                            label: "Ops insight",
                            val: "Billing delay trend",
                            color: "text-amber-400",
                          },
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            className="flex flex-col gap-2 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between"
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.45,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Bot className={cn("h-4 w-4", item.color)} />
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 sm:text-xs">
                                {item.label}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-white">{item.val}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {card.id === "workflow-control" && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between rounded-full bg-[#7F56D9]/20 px-4 py-4 ring-1 ring-[#7F56D9]/40 sm:px-6">
                          <span className="text-sm font-bold text-white">Assign task owner</span>
                          <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F56D9] text-white"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </div>

                        <div className="flex items-center gap-3 opacity-40 sm:gap-4">
                          <div className="h-12 w-full rounded-full bg-white/5 ring-1 ring-white/10" />
                          <div className="h-10 w-20 rounded-full bg-white/5 ring-1 ring-white/10 sm:w-24" />
                        </div>
                      </div>
                    )}

                    {card.id === "billing-ops" && (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F56D9]/20 text-[#C4B5FD]">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-bold text-white">Invoice ready</p>
                          <p className="mt-1 text-xs text-white/40">Status: Confirmed</p>
                        </div>

                        <div className="rounded-2xl border border-[#7F56D9]/30 bg-[#7F56D9]/10 p-4">
                          <ShieldCheck className="mb-4 h-5 w-5 text-[#C4B5FD]" />
                          <p className="text-sm font-bold text-white">Secure Flow</p>
                          <p className="mt-1 text-xs text-white/60">Verified by OpsCore</p>
                        </div>
                      </div>
                    )}

                    {card.id === "collaboration-layer" && (
                      <div className="relative flex justify-center py-4 sm:py-6">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="-ml-4 h-11 w-11 rounded-full border-2 border-[#070910] bg-[#1D2939] first:ml-0 sm:h-12 sm:w-12"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: i * 0.35,
                            }}
                          />
                        ))}

                        <motion.div
                          className="-ml-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-white/5 sm:h-12 sm:w-12"
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "rgba(127,86,217,0.1)",
                          }}
                        >
                          <Users2 className="h-4 w-4 text-white/40" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div
          ref={secondaryGridRef}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {secondaryFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="secondary-feature-card rounded-[24px] border border-white/10 bg-[#0F172A]/45 p-5 backdrop-blur-2xl transition-colors duration-300 hover:border-[#7F56D9]/40 hover:bg-[#0F172A]/60 sm:rounded-3xl sm:p-6"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#C4B5FD] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-base font-bold leading-snug text-white sm:text-lg">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
