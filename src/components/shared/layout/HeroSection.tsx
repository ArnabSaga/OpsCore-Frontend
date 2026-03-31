"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE_SRC = "/image/hero-section.png";
const HERO_VIDEO_SRC = "/video/hero-section-video.mp4";

const techStack = ["Next.js", "TypeScript", "Express", "Prisma", "GSAP", "Tailwind CSS", "Stripe"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const mediaShellRef = useRef<HTMLDivElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const leftBeamRef = useRef<HTMLDivElement | null>(null);
  const rightBeamRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const trustSectionRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const videoReadyRef = useRef(false);
  const videoStartedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const mediaShell = mediaShellRef.current;
    const mediaFrame = mediaFrameRef.current;
    const video = videoRef.current;
    const leftBeam = leftBeamRef.current;
    const rightBeam = rightBeamRef.current;
    const glare = glareRef.current;
    const trustSection = trustSectionRef.current;
    const carousel = carouselRef.current;

    if (
      !section ||
      !pinWrap ||
      !mediaShell ||
      !mediaFrame ||
      !video ||
      !leftBeam ||
      !rightBeam ||
      !glare
    ) {
      return;
    }

    const prepareVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.autoplay = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("preload", "auto");
      video.load();
    };

    const playVideo = () => {
      try {
        if (!videoReadyRef.current) return;

        if (!videoStartedRef.current) {
          video.currentTime = 0;
          videoStartedRef.current = true;
        }

        const promise = video.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(() => {
            // silent fallback for autoplay restrictions or codec mismatch
          });
        }
      } catch {
        // ignore
      }
    };

    const pauseVideo = () => {
      try {
        video.pause();
      } catch {
        // ignore
      }
    };

    const handleCanPlay = () => {
      videoReadyRef.current = true;
      playVideo();
    };

    prepareVideo();
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);

    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, titleRef.current, descriptionRef.current, actionsRef.current], {
        opacity: 0,
        y: 24,
      });

      gsap.set(mediaShell, {
        opacity: 0,
        y: 52,
      });

      gsap.set(mediaFrame, {
        position: "relative",
        left: "50%",
        xPercent: -50,
        top: "auto",
        width: "min(1360px, calc(100vw - 24px))",
        maxWidth: "1360px",
        height: "clamp(260px, 62vw, 760px)",
        borderRadius: "24px",
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        transformOrigin: "center center",
        zIndex: 20,
      });

      gsap.set(leftBeam, {
        xPercent: -120,
        opacity: 0,
        rotate: -14,
        transformOrigin: "left center",
      });

      gsap.set(rightBeam, {
        xPercent: 120,
        opacity: 0,
        rotate: 14,
        transformOrigin: "right center",
      });

      gsap.set(glare, {
        opacity: 0,
        scale: 0.92,
      });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        .to([badgeRef.current, titleRef.current, descriptionRef.current, actionsRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
        })
        .to(
          mediaShell,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.45"
        )
        .to(
          leftBeam,
          {
            opacity: 0.82,
            xPercent: 14,
            duration: 1.45,
            ease: "power2.inOut",
          },
          "-=0.35"
        )
        .to(
          rightBeam,
          {
            opacity: 0.82,
            xPercent: -14,
            duration: 1.45,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          glare,
          {
            opacity: 1,
            scale: 1.06,
            duration: 0.95,
            ease: "power2.out",
          },
          "-=1.05"
        )
        .to(
          [leftBeam, rightBeam],
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .to(
          glare,
          {
            opacity: 0.14,
            duration: 0.55,
            ease: "power2.out",
          },
          "<"
        )
        .call(() => {
          playVideo();
        });

      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: "+=220%",
          scrub: 1.1,
          pin: typeof window !== "undefined" && window.innerWidth >= 1024,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnterBack: () => {
            playVideo();
          },
        },
      });

      scrollTl
        .to(
          mediaShell,
          {
            y: -10,
          },
          0
        )
        .to(
          [badgeRef.current, descriptionRef.current, actionsRef.current],
          {
            opacity: 0,
            y: -24,
            stagger: 0.04,
          },
          0
        )
        .to(
          titleRef.current,
          {
            y: -56,
            opacity: 0.12,
            scale: 0.95,
          },
          0
        );

      if (carousel) {
        gsap.set(carousel, { xPercent: -50 });
        gsap.to(carousel, {
          xPercent: 0,
          ease: "none",
          duration: 24,
          repeat: -1,
        });
      }

      if (trustSection) {
        gsap.from(trustSection, {
          scrollTrigger: {
            trigger: trustSection,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.95,
          ease: "power2.out",
        });
      }

      ScrollTrigger.refresh();
    }, section);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      pauseVideo();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0C111D] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 -top-40 h-112 w-md -translate-x-1/2 rounded-full bg-[#7F56D9]/20 blur-3xl" />
        <div className="absolute -left-32 top-40 h-96 w-[24rem] rounded-full bg-[#6941C6]/12 blur-3xl" />
        <div className="absolute -right-40 top-40 h-104 w-104 rounded-full bg-[#7F56D9]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.12),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-size-[120px_120px] mask-[linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.72),transparent)]" />
      </div>

      <div ref={pinWrapRef} className="relative min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pb-10 lg:pt-28">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <div
              ref={badgeRef}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-[#D7D9E6] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-[#7F56D9]" />
              <span>OpsCore AI-Powered Operations Platform</span>
            </div>

            <h1
              ref={titleRef}
              className={cn(
                "max-w-6xl font-semibold tracking-[-0.05em] text-white",
                "text-[2.1rem] leading-[1.02] sm:text-[3.2rem] lg:text-[5.8rem]"
              )}
            >
              Run Your Entire Operation
              <span className="block bg-[linear-gradient(135deg,#FFFFFF_12%,#D8CCFF_42%,#8E72FF_100%)] bg-clip-text text-transparent">
                From One Intelligent Workspace.
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-6 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg"
            >
              Scale your business with a premium operations platform built for modern
              teams—projects, tasks, invoices, billing, analytics, and workspace control in one
              unified system.
            </p>

            <div ref={actionsRef} className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className={cn(
                  "h-14 rounded-full border border-[#A78BFA]/35 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-7 text-base font-semibold text-white",
                  "shadow-[0_16px_40px_rgba(127,86,217,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_48px_rgba(127,86,217,0.42)]"
                )}
              >
                <Link href="/register" className="inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-white/15 bg-white/4 px-7 text-base text-white backdrop-blur-xl hover:bg-white/8 hover:text-white"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Explore Platform Story
                </Link>
              </Button>
            </div>
          </div>

          <div ref={mediaShellRef} className="relative mt-10 w-full lg:mt-14">
            <div
              ref={mediaFrameRef}
              className={cn(
                "relative w-full overflow-hidden border border-white/10",
                "bg-[#101828]/85 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              )}
            >
              <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-[#7F56D9]/55 to-transparent" />

              <div
                ref={leftBeamRef}
                className="pointer-events-none absolute left-[-18%] top-[-10%] z-30 h-[120%] w-[40%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.04)_20%,rgba(196,181,253,0.22)_48%,rgba(255,255,255,0.04)_70%,transparent_100%)] blur-2xl"
              />

              <div
                ref={rightBeamRef}
                className="pointer-events-none absolute right-[-18%] top-[-10%] z-30 h-[120%] w-[40%] bg-[linear-gradient(270deg,transparent_0%,rgba(255,255,255,0.04)_20%,rgba(196,181,253,0.22)_48%,rgba(255,255,255,0.04)_70%,transparent_100%)] blur-2xl"
              />

              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_42%)] mix-blend-screen"
              />

              <video
                ref={videoRef}
                className="absolute inset-0 z-10 h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
                autoPlay
                poster={HERO_IMAGE_SRC}
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>

              <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(7,10,18,0.14),rgba(12,17,29,0.2),rgba(12,17,29,0.34))]" />

              <div className="absolute left-6 top-6 z-20 rounded-2xl border border-white/10 bg-[rgba(12,17,29,0.6)] px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A]">
                    <div className="absolute inset-0 rounded-xl bg-[#7F56D9]/20 blur-md" />
                    <Image
                      src="/icons/logo.svg"
                      alt="OpsCore logo"
                      width={20}
                      height={20}
                      className="relative"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">OpsCore</p>
                    <p className="text-xs text-[#94A3B8]">Unified business command center</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-20 max-w-md rounded-[28px] border border-white/10 bg-[rgba(16,24,40,0.56)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                  Premium automation
                </p>
                <p className="mt-3 text-[1.7rem] font-semibold leading-tight text-white">
                  Run projects, billing, insights, and execution from one AI-ready workspace.
                </p>
              </div>

              <div className="absolute right-6 top-6 z-20 hidden gap-3 lg:flex">
                <div className="rounded-2xl border border-white/10 bg-[rgba(12,17,29,0.52)] px-4 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#7F56D9]/15 p-2 text-[#C4B5FD]">
                      <Layers3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                        Workspaces
                      </p>
                      <p className="text-sm font-semibold text-white">Multi-tenant control</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[rgba(12,17,29,0.52)] px-4 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#7F56D9]/15 p-2 text-[#C4B5FD]">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/55">Billing</p>
                      <p className="text-sm font-semibold text-white">Invoices + Stripe</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-6 bottom-6 z-20 hidden max-w-sm rounded-[24px] border border-white/10 bg-[rgba(12,17,29,0.5)] p-4 backdrop-blur-xl xl:block">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Workspace-secured operations</p>
                    <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                      Built for structured execution with analytics, role-aware access, and
                      production-grade operational flow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 top-4 z-20 hidden -translate-x-1/2 lg:block">
                <div className="rounded-full border border-white/10 bg-[rgba(12,17,29,0.45)] px-4 py-2 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <BarChart3 className="h-4 w-4 text-[#7F56D9]" />
                    Live workspace visibility
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={trustSectionRef}
        className="relative z-10 border-t border-white/5 bg-[#0C111D]/40 py-12  backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                Built with precision
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Modern infrastructure for premium business operations
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                OpsCore is crafted with a production-grade stack designed for scale, speed,
                security, and a polished operator experience.
              </p>
            </div>

            <div className="relative w-full max-w-3xl overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#0C111D] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#0C111D] to-transparent" />

              <div ref={carouselRef} className="flex w-max items-center gap-4 py-3">
                {[1, 2].map((set) => (
                  <div key={set} className="flex shrink-0 items-center gap-4">
                    {techStack.map((item) => (
                      <div
                        key={`${set}-${item}`}
                        className="group rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-medium text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7F56D9]/35 hover:bg-white/6 hover:text-white"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#7F56D9]" />
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
