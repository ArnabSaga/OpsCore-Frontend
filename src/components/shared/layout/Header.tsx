"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const desktopActionsRef = useRef<HTMLDivElement | null>(null);
  const mobileActionsRef = useRef<HTMLDivElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  const activeHref = useMemo(() => {
    const matched = navItems.find((item) => pathname === item.href);
    return matched?.href ?? null;
  }, [pathname]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1200px)",
          tablet: "(min-width: 768px) and (max-width: 1199px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions ?? {};

          const navChildren = navRef.current ? Array.from(navRef.current.children) : [];
          const actionChildren = desktop
            ? desktopActionsRef.current
              ? Array.from(desktopActionsRef.current.children)
              : []
            : mobileActionsRef.current
              ? Array.from(mobileActionsRef.current.children)
              : [];

          if (reduceMotion) {
            gsap.set([shellRef.current, logoRef.current, ...navChildren, ...actionChildren], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.from(shellRef.current, {
            y: -22,
            opacity: 0,
            scale: 0.985,
            duration: 0.85,
            clearProps: "all",
          })
            .from(
              logoRef.current,
              {
                x: -12,
                opacity: 0,
                duration: 0.5,
                clearProps: "all",
              },
              "-=0.45"
            )
            .from(
              navChildren,
              {
                y: -8,
                opacity: 0,
                stagger: 0.05,
                duration: 0.42,
                clearProps: "all",
              },
              "-=0.35"
            )
            .from(
              actionChildren,
              {
                x: 10,
                opacity: 0,
                stagger: 0.08,
                duration: 0.42,
                clearProps: "all",
              },
              "-=0.35"
            );

          gsap.to(shellRef.current, {
            backgroundColor: "rgba(12,17,29,0.92)",
            borderColor: "rgba(255,255,255,0.14)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "+=120",
              scrub: true,
            },
          });
        }
      );
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.14),transparent_72%)] blur-3xl" />

      <div
        ref={shellRef}
        className={cn(
          "relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#0C111D]/80 px-3 py-2.5 shadow-2xl backdrop-blur-2xl transition-colors duration-300 sm:gap-4 sm:px-4 md:px-5 lg:px-6",
          "hover:bg-[#0C111D]/88"
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/40 to-transparent" />

        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center">
          <nav
            ref={navRef}
            className="hidden items-center gap-1 xl:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive = mounted && activeHref === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-[#94A3B8] hover:text-white"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="header-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(255,255,255,0.05)]"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl outline-none transition-transform duration-300 hover:scale-[1.015]"
          aria-label="OpsCore home"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-xl">
            <div className="absolute inset-0 bg-[#7F56D9]/10 transition-colors duration-300 group-hover:bg-[#7F56D9]/18" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore logo"
              width={22}
              height={22}
              className="relative transition-transform duration-500 group-hover:rotate-12"
              priority
            />
          </div>

          <div className="min-w-0 leading-none">
            <p className="text-sm font-bold tracking-tight text-white sm:text-base">OpsCore</p>
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[#7F56D9]/80 lg:block xl:hidden 2xl:block">
              Operations Platform
            </p>
          </div>
        </Link>

        {/* Right */}
        <div className="flex min-w-0 flex-1 items-center justify-end">
          {/* Desktop */}
          <div ref={desktopActionsRef} className="hidden items-center justify-end gap-5 xl:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
            >
              Log in
            </Link>

            <Button
              asChild
              className="h-11 rounded-full bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,86,217,0.28)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#6941C6]"
            >
              <Link href="/register" className="inline-flex items-center gap-2">
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Tablet / Mobile */}
          <div
            ref={mobileActionsRef}
            className="flex items-center justify-end gap-2 sm:gap-3 xl:hidden"
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden rounded-full text-[#94A3B8] hover:bg-white/5 hover:text-white md:inline-flex"
            >
              <Link href="/login">Log in</Link>
            </Button>

            <Button
              asChild
              className="h-9 rounded-full bg-[#7F56D9] px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#6941C6] sm:h-10 sm:px-5 sm:text-sm"
            >
              <Link href="/register">Sign Up</Link>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white outline-none transition-colors duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#7F56D9]/50 sm:h-10 sm:w-10"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
            >
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              id="mobile-nav-drawer"
              ref={mobileDrawerRef}
              className="fixed inset-x-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-50 mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-[#0C111D]/96 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:inset-x-4 md:inset-x-6"
              initial={{ opacity: 0, y: -18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/40 to-transparent" />

              <div className="flex flex-col px-5 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: 0.04 + index * 0.04, duration: 0.22 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center rounded-2xl px-3 py-3.5 text-base font-medium transition-colors duration-300",
                            isActive
                              ? "bg-white/5 text-white"
                              : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    asChild
                    className="h-13 w-full rounded-2xl bg-[#7F56D9] text-sm font-semibold text-white shadow-xl hover:bg-[#6941C6] sm:h-14 sm:text-base"
                  >
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      Start for Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="h-13 w-full rounded-2xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white sm:h-14 sm:text-base"
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
