"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, CreditCard, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type PricingFeature = {
  label: string;
};

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  features: PricingFeature[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "A clean starting point for small teams that want structured workspaces, task flow, and essential business visibility.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: "Start free",
    ctaHref: "/register",
    icon: Layers3,
    features: [
      { label: "1 workspace with core setup" },
      { label: "Project and task management" },
      { label: "Basic billing visibility" },
      { label: "Role-based team access" },
      { label: "Essential activity tracking" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "For growing teams that need stronger collaboration, smarter visibility, and better operational control across workspaces.",
    monthlyPrice: 20,
    yearlyPrice: 17,
    ctaLabel: "Get started",
    ctaHref: "/register",
    highlighted: true,
    badge: "Most popular",
    icon: Sparkles,
    features: [
      { label: "Unlimited projects and workflows" },
      { label: "Advanced task and execution layers" },
      { label: "Invoice and billing operations" },
      { label: "Analytics and performance tracking" },
      { label: "Workspace insights and reporting" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description:
      "Built for advanced teams that need dedicated support, stricter control, and enterprise-ready operational confidence.",
    monthlyPrice: 100,
    yearlyPrice: 80,
    ctaLabel: "Contact sales",
    ctaHref: "/contact",
    icon: ShieldCheck,
    features: [
      { label: "Multi-workspace operational management" },
      { label: "Advanced security and permissions" },
      { label: "Priority support and onboarding" },
      { label: "Custom workflow consultation" },
      { label: "Scalable billing and revenue oversight" },
    ],
  },
];

function formatPrice(value: number) {
  return `$${value.toFixed(0)}`;
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(
    () => ["Projects", "Billing", "Analytics", "Workspaces", "Execution", "Visibility"],
    []
  );

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

          const headerItems = headerRef.current ? Array.from(headerRef.current.children) : [];
          const pricingCards = gsap.utils.toArray<HTMLElement>(
            ".pricing-card",
            containerRef.current
          );

          if (reduceMotion) {
            gsap.set([...headerItems, toggleRef.current, ...pricingCards], {
              opacity: 1,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            return;
          }

          const headerTl = gsap.timeline({
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          });

          headerTl
            .from(headerItems, {
              y: 28,
              opacity: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "all",
            })
            .from(
              toggleRef.current,
              {
                y: 18,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                clearProps: "all",
              },
              "-=0.45"
            );

          gsap.from(pricingCards, {
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 82%",
              once: true,
            },
            y: desktop ? 42 : 28,
            opacity: 0,
            scale: 0.985,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all",
          });

          if (desktop) {
            const glowTargets = gsap.utils.toArray<HTMLElement>(
              "[data-pricing-glow]",
              containerRef.current
            );

            const glowAnim = gsap.to(glowTargets, {
              opacity: 0.72,
              scale: 1.05,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              stagger: {
                each: 0.25,
                from: "random",
              },
              ease: "sine.inOut",
              paused: true,
            });

            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => {
                if (self.isActive) glowAnim.play();
                else glowAnim.pause();
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
      id="pricing"
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
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center sm:mb-16 lg:mb-20"
        >
          <Badge className="rounded-full border border-[#7F56D9]/30 bg-[#7F56D9]/5 px-4 py-1.5 text-[11px] font-semibold text-[#C4B5FD] backdrop-blur-xl sm:text-xs">
            <CreditCard className="mr-2 h-3.5 w-3.5" />
            Pricing Strategy
          </Badge>

          <h2 className="mt-6 text-[2rem] font-bold leading-[1.05] tracking-tight sm:text-[3rem] lg:mt-8 lg:text-[4.75rem] xl:text-[5.5rem]">
            Flexible plans for
            <span className="block text-[#94A3B8]">modern business.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#94A3B8] sm:mt-6 sm:text-base md:text-lg">
            Choose the alignment that fits your growth—from structured workspace setup to advanced
            operational visibility.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3">
            {stats.map((item) => (
              <motion.span
                key={item}
                className="rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#94A3B8] transition-colors hover:border-[#7F56D9]/30 hover:text-white sm:px-4"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div
          ref={toggleRef}
          className="mb-10 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-6"
        >
          <motion.span
            className={cn(
              "text-sm font-semibold transition-colors duration-300",
              !isYearly ? "text-white" : "text-white/40"
            )}
            animate={{ opacity: !isYearly ? 1 : 0.4 }}
          >
            Monthly
          </motion.span>

          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="scale-110 data-[state=checked]:bg-[#7F56D9] sm:scale-125"
          />

          <div className="flex items-center gap-3">
            <motion.span
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                isYearly ? "text-white" : "text-white/40"
              )}
              animate={{ opacity: isYearly ? 1 : 0.4 }}
            >
              Yearly
            </motion.span>

            <motion.span
              initial={false}
              animate={{ scale: isYearly ? 1.04 : 1 }}
              className="rounded-full bg-[#7F56D9]/20 px-3 py-1.5 text-[10px] font-bold text-[#C4B5FD] ring-1 ring-[#7F56D9]/30"
            >
              SAVE 20%
            </motion.span>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={cn(
                  "pricing-card group relative h-full",
                  plan.highlighted && "lg:-translate-y-2"
                )}
              >
                <motion.div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0F172A]/50 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-[#7F56D9]/40 hover:shadow-[0_28px_80px_rgba(0,0,0,0.36)] sm:rounded-[28px] sm:p-7 lg:rounded-[32px] lg:p-8",
                    plan.highlighted &&
                      "border-[#7F56D9]/30 bg-[#121A2E]/88 shadow-[0_18px_60px_-15px_rgba(127,86,217,0.18)]"
                  )}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                >
                  <div
                    data-pricing-glow
                    className={cn(
                      "pointer-events-none absolute inset-x-10 top-0 h-28 rounded-full opacity-35 blur-[72px] transition-colors duration-500 sm:h-32 sm:blur-[80px]",
                      plan.highlighted
                        ? "bg-[#7F56D9]"
                        : "bg-[#7F56D9]/35 group-hover:bg-[#7F56D9]/55"
                    )}
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
                      <motion.div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7F56D9]/10 text-[#C4B5FD] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 sm:h-16 sm:w-16"
                        whileHover={{ rotate: 8, scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      >
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </motion.div>

                      {plan.badge ? (
                        <span className="rounded-full border border-[#7F56D9]/40 bg-[#7F56D9]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C4B5FD]">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-2xl font-bold text-white sm:text-3xl">{plan.name}</h3>

                    <p className="mt-3 text-sm leading-7 text-[#94A3B8] sm:mt-4">
                      {plan.description}
                    </p>

                    <div className="mb-7 mt-8 flex items-end gap-2 sm:mb-8 sm:mt-10">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${plan.id}-${currentPrice}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22 }}
                          className="text-[2.8rem] font-bold leading-none tracking-tight text-white sm:text-[3.5rem]"
                        >
                          {formatPrice(currentPrice)}
                        </motion.span>
                      </AnimatePresence>

                      <span className="pb-1 text-sm font-medium text-[#94A3B8]">
                        /{isYearly ? "year" : "mo"}
                      </span>
                    </div>

                    <Button
                      asChild
                      className={cn(
                        "h-12 w-full rounded-full text-sm font-bold transition-all duration-300 sm:h-14 sm:text-base",
                        plan.highlighted
                          ? "bg-[#7F56D9] text-white hover:bg-[#6D4DC9] shadow-[0_18px_36px_rgba(127,86,217,0.28)] hover:shadow-[0_24px_46px_rgba(127,86,217,0.38)]"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      )}
                    >
                      <Link
                        href={plan.ctaHref}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {plan.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
                      {plan.features.map((feature) => (
                        <motion.div
                          key={feature.label}
                          className="group/item flex items-start gap-3"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 360, damping: 24 }}
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7F56D9] opacity-80 transition-opacity group-hover/item:opacity-100" />
                          <span className="text-sm leading-relaxed text-[#D0D5DD] transition-colors group-hover/item:text-white">
                            {feature.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
