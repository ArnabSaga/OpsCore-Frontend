"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

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
    step: "01",
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
    step: "02",
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
    step: "03",
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
  const containerRef = useRef<HTMLElement | null>(null);
  const sectionHeaderRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = containerRef.current;
      const header = sectionHeaderRef.current;
      const pinWrapper = pinWrapperRef.current;
      const horizontal = horizontalRef.current;

      if (!section || !header || !pinWrapper || !horizontal) return;

      const cleanups: Array<() => void> = [];
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions ?? {};

          const headerItems = Array.from(header.children);
          const cards = gsap.utils.toArray<HTMLElement>(".process-card", section);

          if (reduceMotion) {
            gsap.set([...headerItems, ...cards], {
              opacity: 1,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: 1 });
            }
            return;
          }

          gsap.from(headerItems, {
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
            y: 24,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          });

          if (!desktop) {
            gsap.from(cards, {
              scrollTrigger: {
                trigger: pinWrapper,
                start: "top 86%",
                once: true,
              },
              y: 28,
              opacity: 0,
              stagger: 0.1,
              duration: 0.75,
              ease: "power3.out",
              clearProps: "all",
            });
            return;
          }

          const getMetrics = () => {
            const viewportWidth = pinWrapper.clientWidth || window.innerWidth;
            const rawOverflow = horizontal.scrollWidth - viewportWidth;
            const overflow = Math.max(0, rawOverflow);

            if (overflow <= 0) {
              return {
                hasOverflow: false,
                endX: 0,
                travel: 0,
              };
            }

            const breathingRoom = gsap.utils.clamp(64, 120, viewportWidth * 0.08);
            const endX = -(overflow - breathingRoom);
            const pacing = viewportWidth >= 1536 ? 2.1 : 1.9;
            const travel = overflow * pacing;

            return {
              hasOverflow: true,
              endX,
              travel,
            };
          };

          const metrics = getMetrics();

          if (!metrics.hasOverflow) {
            gsap.from(cards, {
              scrollTrigger: {
                trigger: pinWrapper,
                start: "top 82%",
                once: true,
              },
              y: 30,
              opacity: 0,
              stagger: 0.1,
              duration: 0.75,
              ease: "power3.out",
              clearProps: "all",
            });

            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: 1 });
            }

            return;
          }

          const horizontalTween = gsap.to(horizontal, {
            x: () => getMetrics().endX,
            ease: "none",
            overwrite: "auto",
            scrollTrigger: {
              trigger: pinWrapper,
              pin: true,
              start: "center center",
              end: () => `+=${getMetrics().travel}`,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!progressBarRef.current) return;

                gsap.to(progressBarRef.current, {
                  scaleX: self.progress,
                  duration: 0.12,
                  ease: "power1.out",
                  overwrite: "auto",
                });
              },
            },
          });

          cards.forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 36,
              scale: 0.975,
              duration: 0.75,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 88%",
                toggleActions: "play none none reverse",
              },
            });
          });

          let ticking = false;

          const handleResize = () => {
            if (ticking) return;

            ticking = true;
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              ticking = false;
            });
          };

          window.addEventListener("resize", handleResize);
          window.addEventListener("orientationchange", handleResize);

          cleanups.push(() => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
          });
        }
      );

      return () => {
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative overflow-hidden bg-[#070910] text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-8%] top-[18%] h-80 w-80 rounded-full bg-[#7F56D9]/6 blur-[90px] sm:h-104 sm:w-104 lg:h-128 lg:w-lg lg:blur-[120px]" />
        <div className="absolute left-[-6%] bottom-[8%] h-64 w-64 rounded-full bg-[#6941C6]/6 blur-[80px] sm:h-88 sm:w-88 lg:h-104 lg:w-104 lg:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative pt-20 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={sectionHeaderRef}
            className="mb-12 flex flex-col items-start gap-5 sm:mb-14 sm:gap-6 lg:mb-20"
          >
            <Badge className="rounded-full border border-[#7F56D9]/30 bg-[#7F56D9]/5 px-4 py-1.5 text-[11px] font-semibold text-[#C4B5FD] backdrop-blur-xl sm:text-xs">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Operational Framework
            </Badge>

            <h2 className="max-w-5xl text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-[3rem] lg:text-[4.75rem] xl:text-[5.5rem]">
              From setup to execution
              <span className="block text-[#94A3B8]">in one premium flow.</span>
            </h2>

            <div className="flex w-full flex-col items-start justify-between gap-5 sm:gap-6 lg:flex-row lg:items-end">
              <p className="max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
                OpsCore helps teams structure workspaces, coordinate execution, and improve
                operational clarity through a high-performance system.
              </p>

              <div className="group flex items-center gap-4">
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full px-0 text-white/60 hover:bg-transparent hover:text-white"
                >
                  <Link href="/how-it-works">Learn more</Link>
                </Button>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#7F56D9]/50 sm:h-12 sm:w-12">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 left-1/2 z-30 hidden w-48 -translate-x-1/2 lg:block xl:w-64">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div ref={progressBarRef} className="h-full origin-left scale-x-0 bg-[#7F56D9]" />
          </div>
        </div>

        <div
          ref={pinWrapperRef}
          className="flex min-h-176 flex-col items-center justify-center lg:min-h-screen"
        >
          <div className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-0">
            <div
              ref={horizontalRef}
              className={cn(
                "flex flex-col gap-6 sm:gap-8 lg:w-max lg:flex-row lg:gap-10 xl:gap-12",
                "lg:px-[max(3rem,calc((100vw-1280px)/2))]"
              )}
            >
              {processSteps.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.id}
                    className="process-card group relative w-full shrink-0 lg:w-[560px] xl:w-[660px]"
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0F172A]/50 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl transition-all duration-500 hover:border-[#7F56D9]/35 sm:rounded-[28px] sm:p-7 lg:rounded-[32px] lg:p-10"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    >
                      <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.14),transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:h-48 sm:w-48" />

                      <div className="relative flex flex-col gap-6 sm:gap-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#C4B5FD] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 sm:h-16 sm:w-16">
                            <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                          </div>

                          <span className="text-[3.25rem] font-black leading-none text-white/5 transition-all duration-700 group-hover:text-[#7F56D9]/20 sm:text-[4rem] lg:text-[4.5rem]">
                            {item.step}
                          </span>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl xl:text-4xl">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
                            {item.description}
                          </p>
                        </div>

                        <div className="relative mt-1 aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            className="object-cover opacity-45 transition-all duration-1000 group-hover:scale-[1.03] group-hover:opacity-100"
                            sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 560px, 660px"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(7,9,16,0.55))] transition-opacity duration-500 group-hover:opacity-30" />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {[item.tagA, item.tagB].map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#94A3B8] transition-all duration-300 group-hover:border-[#7F56D9]/30 group-hover:bg-[#7F56D9]/10 group-hover:text-white sm:px-4"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
