"use client";

import gsap from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Price", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        shellRef.current,
        { y: -24, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75 }
      )
        .fromTo(
          navRef.current?.children || [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.45 },
          "-=0.4"
        )
        .fromTo(
          logoRef.current,
          { y: -12, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          actionsRef.current?.children || [],
          { x: 16, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
          "-=0.35"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.18),transparent_65%)] blur-3xl" />

      <div
        ref={shellRef}
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 overflow-hidden rounded-[24px]",
          "border border-white/10 bg-[rgba(12,17,29,0.78)] px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl",
          "upports-backdrop-filter:bg-[rgba(12,17,29,0.72)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-[linear-gradient(135deg,rgba(127,86,217,0.14),rgba(105,65,198,0.04)_35%,rgba(255,255,255,0.02)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/45 to-transparent" />

        <nav ref={navRef} className="hidden items-center gap-1 justify-self-start md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-[#94A3B8] transition-all duration-300",
                "hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          ref={logoRef}
          href="/"
          className="group flex items-center justify-center gap-3 justify-self-center rounded-2xl outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/70"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_16px_32px_rgba(0,0,0,0.28)]">
            <div className="absolute inset-0 rounded-2xl bg-[#7F56D9]/20 blur-lg" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore logo"
              width={22}
              height={22}
              className="relative object-contain"
              priority
            />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-base font-semibold tracking-tight text-white">OpsCore</p>
            <p className="text-[11px] font-medium leading-none text-[#94A3B8]">
              Business Operations Platform
            </p>
          </div>
        </Link>

        <div ref={actionsRef} className="hidden items-center gap-2 justify-self-end md:flex">
          <Button
            asChild
            variant="ghost"
            className="rounded-full px-5 text-sm font-medium text-[#94A3B8] hover:bg-white/5 hover:text-white"
          >
            <Link href="/login">Log in</Link>
          </Button>

          <Button
            asChild
            className={cn(
              "rounded-full border border-[#8B6CFF]/40 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)]",
              "px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,86,217,0.35)]",
              "transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_30px_rgba(127,86,217,0.45)]"
            )}
          >
            <Link href="/register" className="inline-flex items-center gap-2">
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="col-span-3 flex justify-end md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-l border-white/10 bg-[#0C111D] p-0 text-white"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <SheetTitle className="text-left text-base font-semibold text-white">
                    OpsCore
                  </SheetTitle>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-xl text-white hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="px-5 py-6">
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/20 blur-md" />
                      <Image
                        src="/icons/logo.svg"
                        alt="OpsCore logo"
                        width={22}
                        height={22}
                        className="relative object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">OpsCore</p>
                      <p className="text-xs text-[#94A3B8]">Business Operations Platform</p>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-[#94A3B8] transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-6 grid gap-3">
                    <Button
                      asChild
                      variant="ghost"
                      className="justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Link href="/login" onClick={() => setOpen(false)}>
                        Log in
                      </Link>
                    </Button>

                    <Button
                      asChild
                      className={cn(
                        "justify-center rounded-xl border border-[#8B6CFF]/40 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)]",
                        "text-white shadow-[0_10px_24px_rgba(127,86,217,0.35)]"
                      )}
                    >
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-2"
                      >
                        Sign Up
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
