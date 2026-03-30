"use client";

import gsap from "gsap";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerNav = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Price", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const footerMeta = [
  { label: "License", href: "/license" },
  { label: "Changelog", href: "/changelog" },
  { label: "Style Guide", href: "/style-guide" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topRowRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(topRowRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
        .fromTo(
          [brandRef.current, navRef.current, socialRef.current],
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.35"
        )
        .fromTo(
          wordmarkRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.2"
        )
        .fromTo(
          bottomBarRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.35"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#05070B] text-white"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/50 to-transparent" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F56D9]/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#6941C6]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#7F56D9]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.45),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div ref={topRowRef} className="grid gap-10 lg:grid-cols-[1.25fr_auto_auto]">
          {/* brand */}
          <div ref={brandRef} className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/20 blur-xl" />
                <Image
                  src="/icons/logo.svg"
                  alt="OpsCore logo"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                  className="relative drop-shadow-[0_6px_18px_rgba(255,255,255,0.3)]"
                  priority
                />
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-tight text-white">OpsCore</p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#94A3B8] sm:text-base">
              Build smarter workflows, manage teams, and unify your business operations in one
              modern multi-tenant platform.
            </p>

            <div className="mt-6">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/pricing">
                  Explore OpsCore
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* nav */}
          <div ref={navRef} className="lg:justify-self-center">
            <p className="mb-4 text-sm font-medium text-white/80">Navigation</p>
            <nav className="flex flex-col gap-3">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center text-sm text-[#94A3B8] transition-colors duration-300 hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5 translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* social */}
          <div ref={socialRef} className="lg:justify-self-end">
            <p className="mb-4 text-sm font-medium text-white/80">Social media</p>
            <div className="flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Button
                    key={item.label}
                    asChild
                    size="icon"
                    variant="ghost"
                    className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-[#C7C9D1] hover:bg-white/10 hover:text-white"
                  >
                    <Link href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                      <Icon className="h-4.5 w-4.5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* giant background word */}
        <div ref={wordmarkRef} className="relative mt-14 select-none overflow-hidden py-6">
          <h2 className="text-center text-[4.5rem] font-black uppercase leading-none tracking-[0.12em] text-white/[0.07] sm:text-[7rem] md:text-[9rem] lg:text-[12rem]">
            OPSCORE
          </h2>
        </div>

        <Separator className="mb-6 bg-white/10" />

        {/* bottom pill bar */}
        <div
          ref={bottomBarRef}
          className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#0B1120]/80 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:px-6"
        >
          <p className="text-sm text-[#C7CAD4]">
            © 2026 All rights reserved. Designed for{" "}
            <span className="font-semibold text-white">OpsCore</span>.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerMeta.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-[#C7CAD4] transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
