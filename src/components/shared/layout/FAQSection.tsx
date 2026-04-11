"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    id: "what-is-opscore",
    question: "What exactly does OpsCore help teams manage?",
    answer:
      "OpsCore helps teams run workspaces, projects, tasks, billing visibility, and operational coordination from one unified platform. It is designed to bring more structure, ownership, and clarity into day-to-day business execution.",
  },
  {
    id: "technical-skill",
    question: "Do I need technical or coding knowledge to use OpsCore?",
    answer:
      "No. OpsCore is designed for business teams, operators, managers, and founders—not just technical users. The interface is built to feel structured and intuitive, so teams can organize workflows and execution without needing engineering knowledge.",
  },
  {
    id: "security",
    question: "Is my workspace data safe and properly organized?",
    answer:
      "Yes. OpsCore is built with structured workspace logic, role-aware access, and operational separation in mind. It is designed to support business teams that need cleaner control over visibility, collaboration, and execution flow.",
  },
  {
    id: "setup-time",
    question: "How long does it take to get started with OpsCore?",
    answer:
      "Teams can get started quickly with a clean workspace setup, then expand into projects, execution tracking, and billing visibility as operations grow. The platform is designed to reduce friction during onboarding and early adoption.",
  },
  {
    id: "integrations",
    question: "Can OpsCore fit into my existing operational workflow?",
    answer:
      "Yes. OpsCore is built to support modern operational workflows and can sit naturally within teams that already manage projects, billing, execution, and internal coordination. It is meant to simplify and unify, not create extra complexity.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const accordionWrapRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const [activeItem, setActiveItem] = useState<string>("what-is-opscore");

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
          const { reduceMotion } = context.conditions ?? {};

          const headerItems = headerRef.current ? Array.from(headerRef.current.children) : [];
          const accordionItems = gsap.utils.toArray<HTMLElement>(
            ".faq-accordion-item",
            sectionRef.current
          );

          if (reduceMotion) {
            gsap.set([...headerItems, ...accordionItems, ctaRef.current], {
              opacity: 1,
              y: 0,
              clearProps: "all",
            });
            return;
          }

          gsap.from(headerItems, {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
          });

          gsap.from(accordionItems, {
            scrollTrigger: {
              trigger: accordionWrapRef.current,
              start: "top 86%",
              once: true,
            },
            opacity: 0,
            y: 26,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
          });

          gsap.from(ctaRef.current, {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              once: true,
            },
            opacity: 0,
            y: 32,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "all",
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-[#0C111D] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl opacity-50 sm:h-72 sm:w-72" />
        <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-[#6941C6]/10 blur-3xl opacity-30 sm:h-80 sm:w-80" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#7F56D9]/10 blur-3xl opacity-30 sm:h-80 sm:w-80" />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[90px_90px] sm:bg-size-[120px_120px]"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.55), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center sm:mb-14 lg:mb-16"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/5 px-4 py-1.5 text-[11px] font-semibold text-[#E4DFFF] backdrop-blur-xl sm:text-xs">
            <HelpCircle className="mr-2 h-3.5 w-3.5 text-[#7F56D9]" />
            FAQ
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[3rem] lg:text-[4rem] xl:text-[4.3rem]">
            Frequently asked questions
            <span className="block bg-linear-to-r from-white via-[#D8CCFF] to-[#8E72FF] bg-clip-text text-transparent">
              about running operations
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:mt-6 sm:text-base md:text-lg">
            Everything you need to know about how OpsCore helps teams bring more structure,
            execution clarity, and workspace control into modern business operations.
          </p>
        </div>

        <div ref={accordionWrapRef} className="mx-auto max-w-4xl">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={(value) => setActiveItem(value || "what-is-opscore")}
            className="space-y-3 sm:space-y-4"
          >
            {faqItems.map((item) => {
              const isActive = activeItem === item.id;

              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "faq-accordion-item overflow-hidden rounded-[20px] border border-white/10 bg-[#101828]/62 px-0 shadow-lg backdrop-blur-2xl transition-all duration-300 sm:rounded-[24px]",
                    isActive ? "border-[#7F56D9]/45 bg-[#101828]/82" : "hover:border-white/20"
                  )}
                >
                  <AccordionTrigger
                    className={cn(
                      "group relative px-5 py-5 text-left text-sm font-semibold text-white/90 transition-all hover:no-underline sm:px-8 sm:py-6 sm:text-lg",
                      isActive ? "text-white" : ""
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-transparent transition-colors duration-300 group-data-[state=open]:bg-[#7F56D9]" />
                    <span className="pr-6">{item.question}</span>
                  </AccordionTrigger>

                  <AccordionContent className="overflow-hidden px-5 sm:px-8">
                    <motion.div
                      layout
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="pb-5 sm:pb-6"
                    >
                      <div
                        className={cn(
                          "border-t pt-4 sm:pt-5",
                          isActive ? "border-[#7F56D9]/15" : "border-white/5"
                        )}
                      >
                        <p className="max-w-3xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div ref={ctaRef} className="mx-auto mt-14 max-w-5xl sm:mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/50 px-5 py-10 shadow-2xl backdrop-blur-2xl sm:rounded-[28px] sm:px-8 sm:py-12 lg:rounded-[32px] lg:px-12 lg:py-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(127,86,217,0.06),transparent_50%)]" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-3xl text-[1.7rem] font-bold leading-tight tracking-tight text-white sm:text-[2.3rem] lg:text-[3rem]">
                Ready to bring structure and clarity into your operations?
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:mt-6 sm:text-base lg:text-lg">
                Start with OpsCore and create a cleaner operating system for your team—projects,
                execution, and workspace flow in one place.
              </p>

              <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0_0_20px_rgba(127,86,217,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#6941C6] sm:h-14 sm:px-8 sm:text-base"
                >
                  <Link href="/register" className="inline-flex items-center justify-center gap-2">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-12 rounded-full px-6 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white sm:h-14 sm:px-8 sm:text-base"
                >
                  <Link href="/pricing" className="inline-flex items-center justify-center gap-2">
                    Try for free
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
