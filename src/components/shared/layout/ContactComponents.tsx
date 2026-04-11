"use client";

import { useGSAP } from "@gsap/react";
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
import { useRef } from "react";

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
    value: "OpsCore@gmail.com",
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

const quickTopics = ["Demo", "Support", "Partnership", "Onboarding", "Billing"];

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
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(16,24,40,0.72)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
        "sm:rounded-[26px] lg:rounded-[30px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/8" />
      {children}
    </div>
  );
}

export default function ContactComponents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const channelsRef = useRef<HTMLDivElement | null>(null);
  const contactGridRef = useRef<HTMLDivElement | null>(null);
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
                ...(channelsRef.current ? Array.from(channelsRef.current.children) : []),
                ...(contactGridRef.current ? Array.from(contactGridRef.current.children) : []),
                ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
              ],
              {
                opacity: 1,
                y: 0,
                clearProps: "all",
              }
            );
            return;
          }

          revealSection(heroRef.current, 26);
          revealSection(channelsRef.current, 28);
          revealSection(contactGridRef.current, 28);
          revealSection(ctaRef.current, 24);

          if (desktop) {
            const floatingNodes = gsap.utils.toArray<HTMLElement>("[data-float]", section);

            floatingNodes.forEach((node, index) => {
              gsap.to(node, {
                y: index % 2 === 0 ? -6 : 6,
                x: index % 2 === 0 ? 4 : -4,
                duration: 4 + index * 0.25,
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
      id="contact"
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
            Contact OpsCore
          </Badge>

          <h1 className="mt-6 max-w-5xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.8rem] lg:text-[4.25rem] xl:text-[5rem]">
            Reach the right team
            <span className="block bg-[linear-gradient(135deg,#FFFFFF_10%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
              for your next operational move
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg">
            Whether you want a product walkthrough, onboarding support, or a business conversation,
            OpsCore makes it easy to connect with the right people.
          </p>

          <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickTopics.map((item) => (
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

        {/* Channel cards */}
        <div
          ref={channelsRef}
          className="mb-12 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 sm:mb-16 lg:mb-20"
        >
          {contactChannels.map((item) => {
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
              </GlassCard>
            );
          })}
        </div>

        {/* Form + Facts */}
        <div
          ref={contactGridRef}
          className="mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start sm:mb-16 lg:mb-20"
        >
          <GlassCard className="p-5 sm:p-7">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[#8E72FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Send a message
              </p>

              <h2 className="mt-4 text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2rem] lg:text-[2.2rem]">
                Tell us what your team needs
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                Share your use case and the OpsCore team can guide you toward the right next
                step—demo, support, onboarding, or business conversation.
              </p>

              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Your name"
                    className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-[#94A3B8] backdrop-blur-xl sm:h-12"
                  />
                  <Input
                    placeholder="Work email"
                    type="email"
                    className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-[#94A3B8] backdrop-blur-xl sm:h-12"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Company or team"
                    className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-[#94A3B8] backdrop-blur-xl sm:h-12"
                  />
                  <Input
                    placeholder="What can we help with?"
                    className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-[#94A3B8] backdrop-blur-xl sm:h-12"
                  />
                </div>

                <Textarea
                  placeholder="Tell us about your workspace, team, or operational challenge..."
                  className="min-h-[150px] rounded-[22px] border-white/10 bg-white/5 text-white placeholder:text-[#94A3B8] backdrop-blur-xl sm:min-h-[170px]"
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
          </GlassCard>

          <div className="grid gap-5 sm:gap-6">
            <GlassCard className="p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[#7F56D9]/14 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                  Contact details
                </p>

                <h3 className="mt-4 text-[1.8rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[2rem]">
                  Reach OpsCore directly
                </h3>

                <div className="mt-6 grid gap-4">
                  {contactFacts.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        data-float
                        className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
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
            </GlassCard>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6">
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

        {/* CTA */}
        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <GlassCard className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-full bg-[#8E72FF]/24 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 rounded-full bg-[#7F56D9]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <h3 className="max-w-2xl text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-[2.6rem] lg:text-[3rem]">
                Need a clearer way to run operations with your team?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8">
                Start the conversation with OpsCore and explore how workspaces, execution, billing
                visibility, and operational structure can come together in one system.
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
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
