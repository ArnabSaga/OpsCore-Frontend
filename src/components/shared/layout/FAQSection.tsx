"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const accordionWrap = accordionWrapRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !accordionWrap || !cta) return;

    const ctx = gsap.context(() => {
      gsap.set(header.children, { opacity: 0, y: 26 });
      gsap.set(accordionWrap, { opacity: 0, y: 34 });
      gsap.set(cta, { opacity: 0, y: 38 });

      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: header,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(accordionWrap, {
        opacity: 1,
        y: 0,
        duration: 0.92,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: accordionWrap,
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: cta,
          start: "top 88%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-[#0C111D] py-24 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/14 blur-3xl" />
        <div className="absolute -left-24 top-44 h-80 w-80 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.58),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center sm:mb-14"
        >
          <Badge className="rounded-full border border-[#8B6CFF]/30 bg-white/4 px-4 py-2 text-sm font-medium text-[#E4DFFF] backdrop-blur-xl hover:bg-white/6">
            <HelpCircle className="mr-2 h-4 w-4 text-[#7F56D9]" />
            FAQ
          </Badge>

          <h2 className="mt-6 max-w-5xl text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[3.6rem] lg:text-[4.3rem]">
            Frequently asked questions
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              about running operations with OpsCore
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            Everything you need to know about how OpsCore helps teams bring more structure,
            execution clarity, and workspace control into modern business operations.
          </p>
        </div>

        <div ref={accordionWrapRef} className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible defaultValue="what-is-opscore" className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={cn(
                  "overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(16,24,40,0.72)] px-0 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
                  "transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#7F56D9]/28 hover:shadow-[0_30px_80px_rgba(0,0,0,0.36)]"
                )}
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-16 rounded-full bg-[#7F56D9]/10 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.07),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

                <AccordionTrigger
                  className={cn(
                    "group relative px-6 py-5 text-left text-base font-semibold text-white hover:no-underline sm:px-7 sm:py-6 sm:text-[1.05rem]",
                    "[&[data-state=open]>svg]:rotate-180"
                  )}
                >
                  <span className="pr-6">{item.question}</span>
                </AccordionTrigger>

                <AccordionContent className="relative px-6 pb-6 pt-0 sm:px-7">
                  <div className="border-t border-white/10 pt-4">
                    <p className="max-w-3xl text-sm leading-7 text-[#C8CDD8] sm:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div ref={ctaRef} className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.76)] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(127,86,217,0.08),transparent_35%,rgba(255,255,255,0.02)_100%)]" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem]">
                Ready to bring structure and clarity into your operations?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Start with OpsCore and create a cleaner operating system for your team—projects,
                execution, billing visibility, and workspace flow in one place.
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
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-12 rounded-full px-4 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
                >
                  <Link href="/pricing" className="inline-flex items-center gap-2">
                    Try for free
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
