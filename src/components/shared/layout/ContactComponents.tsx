"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Building2,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const contactChannels = [
  {
    title: "Sales & platform demo",
    description:
      "Speak with our team to explore how OpsCore can support your workspaces, projects, billing, and operational visibility.",
    icon: Building2,
    action: "Book a conversation",
    href: "/register",
  },
  {
    title: "Support & onboarding",
    description:
      "Need guidance on setup, workflow structure, or platform usage? We&apos;re here to help your team move faster with clarity.",
    icon: Headphones,
    action: "Get support",
    href: "/faq",
  },
  {
    title: "Partnership & business inquiry",
    description:
      "Reach out for collaboration, strategic partnership, or custom operational use cases related to the OpsCore platform.",
    icon: Users2,
    action: "Contact partnership team",
    href: "/about",
  },
];

const contactFacts = [
  {
    label: "Email",
    value: "hello@opscore.io",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+1 (800) 555-0199",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Global remote-first operations team",
    icon: MapPin,
  },
  {
    label: "Response window",
    value: "Usually within 24 business hours",
    icon: Clock3,
  },
];

// const benefits = [
//   "Clearer path to demo, support, or business inquiry",
//   "OpsCore-focused contact experience aligned with the platform",
//   "Structured intake for workspaces, execution, billing, and visibility needs",
//   "Premium SaaS presentation matched to the rest of the landing system",
// ];

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

export default function ContactComponents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const channelsRef = useRef<HTMLDivElement | null>(null);
  const contactGridRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const channels = channelsRef.current;
    const contactGrid = contactGridRef.current;
    const cta = ctaRef.current;

    if (!section || !hero || !channels || !contactGrid || !cta) return;

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
      reveal(Array.from(channels.children), channels);
      reveal(Array.from(contactGrid.children), contactGrid);
      reveal(Array.from(cta.children), cta);

      const floatingNodes = section.querySelectorAll("[data-float]");
      floatingNodes.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -8 : 8,
          duration: 3 + index * 0.2,
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
      id="contact"
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
            Contact OpsCore
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[5rem]">
            Reach the right team
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              for your next operational move
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            Whether you want a product walkthrough, onboarding support, or a business conversation,
            OpsCore makes it easy to connect with the right people.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Demo", "Support", "Partnership", "Onboarding", "Billing"].map((item) => (
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

        {/* 2. Channel cards */}
        <div ref={channelsRef} className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3 sm:mb-20">
          {contactChannels.map((item) => {
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

                  <Button
                    asChild
                    variant="ghost"
                    className="mt-6 h-11 rounded-full px-0 text-sm font-medium text-white/90 hover:bg-transparent hover:text-white"
                  >
                    <Link href={item.href} className="inline-flex items-center gap-2">
                      {item.action}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Contact form + contact facts */}
        <div
          ref={contactGridRef}
          className="mb-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start sm:mb-20"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Send a message
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                Tell us what your team needs
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#94A3B8] sm:text-base">
                Share your use case and the OpsCore team can guide you toward the right next
                step—demo, support, onboarding, or business conversation.
              </p>

              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Your name"
                    className="h-12 rounded-2xl border-white/10 bg-white/4 text-white placeholder:text-[#94A3B8] backdrop-blur-xl"
                  />
                  <Input
                    placeholder="Work email"
                    type="email"
                    className="h-12 rounded-2xl border-white/10 bg-white/4 text-white placeholder:text-[#94A3B8] backdrop-blur-xl"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Company or team"
                    className="h-12 rounded-2xl border-white/10 bg-white/4 text-white placeholder:text-[#94A3B8] backdrop-blur-xl"
                  />
                  <Input
                    placeholder="What can we help with?"
                    className="h-12 rounded-2xl border-white/10 bg-white/4 text-white placeholder:text-[#94A3B8] backdrop-blur-xl"
                  />
                </div>

                <Textarea
                  placeholder="Tell us about your workspace, team, or operational challenge..."
                  className="min-h-[160px] rounded-[22px] border-white/10 bg-white/4 text-white placeholder:text-[#94A3B8] backdrop-blur-xl"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-7 text-[#94A3B8]">
                    We usually reply within one business day.
                  </p>

                  <Button
                    type="submit"
                    className={cn(
                      "h-12 rounded-full border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-6 text-sm font-semibold text-white",
                      "shadow-[0_16px_40px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_44px_rgba(127,86,217,0.38)]"
                    )}
                  >
                    Submit inquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.72)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
              <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                  Contact details
                </p>
                <h3 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                  Reach OpsCore directly
                </h3>

                <div className="mt-6 grid gap-4">
                  {contactFacts.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        data-float
                        className="rounded-[22px] border border-white/10 bg-white/3 p-5 backdrop-blur-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl bg-[#7F56D9]/15 p-3 text-[#D5CCFF]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/3 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">
                    Structured contact experience
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                    Built to support serious teams with clear paths for demos, support, partnership,
                    and onboarding conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CTA / final block */}
        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(16,24,40,0.76)] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3rem]">
                Need a clearer way to run operations with your team?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Start the conversation with OpsCore and explore how workspaces, execution, billing
                visibility, and operational structure can come together in one system.
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
                    Explore pricing
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
