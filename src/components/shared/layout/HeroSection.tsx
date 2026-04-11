"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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

  const glareRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrap = pinWrapRef.current;
      const video = videoRef.current;
      const mediaShell = mediaShellRef.current;
      const mediaFrame = mediaFrameRef.current;
      const glare = glareRef.current;
      const actions = actionsRef.current;
      const carousel = carouselRef.current;

      if (!section || !pinWrap || !mediaShell || !mediaFrame || !actions) return;

      const cleanups: Array<() => void> = [];
      const mm = gsap.matchMedia();

      if (video) {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, tablet, mobile, reduceMotion } = mediaContext.conditions ?? {};

          const introTargets = [
            badgeRef.current,
            titleRef.current,
            descriptionRef.current,
            actionsRef.current,
            mediaShellRef.current,
          ].filter(Boolean);

          const parallaxEls = gsap.utils.toArray<HTMLElement>(".hero-parallax", section);

          const ctaLinks = actions.querySelectorAll<HTMLAnchorElement>("a");

          if (reduceMotion) {
            gsap.set(introTargets, {
              opacity: 1,
              y: 0,
              scale: 1,
              clearProps: "all",
            });
            return;
          }

          const introTl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          introTl
            .from(
              [badgeRef.current, titleRef.current, descriptionRef.current, actionsRef.current],
              {
                opacity: 0,
                y: 24,
                duration: 0.85,
                stagger: 0.08,
              }
            )
            .from(
              mediaShell,
              {
                opacity: 0,
                y: mobile ? 24 : 40,
                scale: 0.985,
                duration: 1,
              },
              "-=0.5"
            )
            .from(
              mediaFrame,
              {
                clipPath: desktop
                  ? "inset(6% 6% 6% 6% round 32px)"
                  : "inset(2% 2% 2% 2% round 24px)",
                duration: 0.9,
                ease: "power2.inOut",
              },
              "-=0.7"
            );

          if (desktop && parallaxEls.length) {
            gsap.to(parallaxEls, {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if ((desktop || tablet) && glare) {
            gsap.to(glare, {
              backgroundPosition: desktop ? "68% 32%" : "60% 40%",
              ease: "none",
              scrollTrigger: {
                trigger: mediaFrame,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          if (desktop) {
            gsap.to(mediaShell, {
              y: -28,
              ease: "none",
              scrollTrigger: {
                trigger: pinWrap,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });

            const pinTl = gsap.timeline({
              scrollTrigger: {
                trigger: pinWrap,
                start: "top top",
                end: "+=110%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            pinTl
              .to(
                [badgeRef.current, descriptionRef.current, actionsRef.current],
                {
                  opacity: 0,
                  y: -28,
                  stagger: 0.03,
                },
                0
              )
              .to(
                titleRef.current,
                {
                  scale: 0.94,
                  opacity: 0.25,
                  y: -42,
                },
                0
              )
              .to(
                mediaShell,
                {
                  scale: 1.02,
                  y: -24,
                },
                0
              );
          }

          if (desktop) {
            ctaLinks.forEach((link) => {
              const handleMove = (event: MouseEvent) => {
                const rect = link.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                const maxMove = 10;
                const moveX = gsap.utils.clamp(-maxMove, maxMove, x * 0.12);
                const moveY = gsap.utils.clamp(-maxMove, maxMove, y * 0.12);

                gsap.to(link, {
                  x: moveX,
                  y: moveY,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              };

              const handleLeave = () => {
                gsap.to(link, {
                  x: 0,
                  y: 0,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              };

              link.addEventListener("mousemove", handleMove);
              link.addEventListener("mouseleave", handleLeave);

              cleanups.push(() => {
                link.removeEventListener("mousemove", handleMove);
                link.removeEventListener("mouseleave", handleLeave);
              });
            });
          }

          if (desktop) {
            const floatingItems = mediaShell.querySelectorAll<HTMLElement>(".floating-ui");

            floatingItems.forEach((item, index) => {
              gsap.to(item, {
                y: index % 2 === 0 ? -8 : 8,
                x: index % 2 === 0 ? 6 : -6,
                duration: 8 + index * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            });
          }

          if (carousel) {
            gsap.to(carousel, {
              xPercent: -50,
              duration: mobile ? 24 : 30,
              repeat: -1,
              ease: "none",
            });
          }
        }
      );

      return () => {
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0C111D] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-parallax absolute left-1/2 -top-40 h-96 w-96 -translate-x-1/2 rounded-full bg-[#7F56D9]/12 blur-[90px] sm:h-128 sm:w-160 lg:h-160 lg:w-184 lg:blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.10),transparent_52%)]" />
        <div className="hero-parallax absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[70px_70px] sm:bg-size-[90px_90px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div ref={pinWrapRef} className="relative">
        <div className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <motion.div
              ref={badgeRef}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium text-[#D7D9E6] backdrop-blur-xl sm:mb-6 sm:px-4 sm:text-sm"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-[#7F56D9]" />
              <span className="truncate">OpsCore AI-Powered Operations Platform</span>
            </motion.div>

            <h1
              ref={titleRef}
              className={cn(
                "max-w-6xl font-extrabold tracking-tight text-white",
                "text-[2.15rem] leading-[1.02] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.75rem] xl:text-[6.5rem]"
              )}
            >
              Run Your Entire Operation
              <span className="mt-2 block bg-[linear-gradient(135deg,#FFFFFF_18%,#DDD3FF_48%,#7F56D9_100%)] bg-clip-text text-transparent">
                From One Workspace.
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-6 max-w-xl text-sm leading-7 text-[#94A3B8] sm:mt-7 sm:text-base md:max-w-2xl md:text-lg md:leading-8 lg:mt-8 lg:text-xl"
            >
              Scale your business with a premium operations platform—projects, tasks, invoices,
              analytics, and workspace control in one unified system.
            </p>

            <div
              ref={actionsRef}
              className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className={cn(
                  "group h-12 w-full rounded-full border border-[#A78BFA]/30 bg-[linear-gradient(135deg,#7F56D9_0%,#6941C6_100%)] px-7 text-sm font-bold text-white sm:h-14 sm:w-auto sm:px-8 sm:text-base",
                  "shadow-[0_14px_28px_rgba(127,86,217,0.28)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(127,86,217,0.38)]"
                )}
              >
                <Link href="/register" className="inline-flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-full border-white/10 bg-white/5 px-7 text-sm text-white backdrop-blur-xl hover:bg-white/10 hover:text-white sm:h-14 sm:w-auto sm:px-8 sm:text-base"
              >
                <Link href="/about" className="inline-flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 fill-white" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>

          <div ref={mediaShellRef} className="relative mt-12 w-full sm:mt-14 lg:mt-16 xl:mt-20">
            <div
              ref={mediaFrameRef}
              className="relative mx-auto aspect-video w-full max-w-[1360px] overflow-hidden rounded-[22px] border border-white/10 bg-[#101828] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:rounded-[28px] lg:rounded-[34px] lg:shadow-[0_40px_100px_rgba(0,0,0,0.52)]"
            >
              <div className="pointer-events-none absolute inset-0 z-20 ring-1 ring-inset ring-white/10" />

              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.14),transparent_42%)] mix-blend-screen"
              />

              <video
                ref={videoRef}
                className="absolute inset-0 z-10 h-full w-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                poster="/images/hero-video-poster.jpg"
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>

              <div className="absolute inset-x-0 bottom-0 z-20 h-1/3 bg-linear-to-t from-[#0C111D]/70 via-transparent to-transparent" />

              <div className="floating-ui absolute left-4 top-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl md:flex">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F56D9]/20">
                  <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    style={{ height: "auto" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">OpsCore Live</p>
                  <p className="text-[10px] text-[#94A3B8]">Production Environment</p>
                </div>
              </div>

              <div className="floating-ui absolute bottom-4 right-4 z-20 hidden max-w-[16rem] rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl lg:block">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-xs leading-relaxed text-[#94A3B8]">
                    <span className="font-bold text-white">Secure by default.</span> Multi-tenant
                    data isolation enabled for all workspaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 bg-black/20 py-12 backdrop-blur-sm sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7F56D9] sm:text-xs">
                Enterprise Stack
              </p>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl lg:mt-4 lg:text-3xl">
                Built for heavy-duty business execution.
              </h3>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-linear-to-r from-[#0C111D] to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-linear-to-l from-[#0C111D] to-transparent sm:w-24" />

              <div
                ref={carouselRef}
                className="flex w-max items-center gap-4 py-3 sm:gap-6 sm:py-4"
              >
                {[...techStack, ...techStack].map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 transition-colors hover:bg-[#7F56D9]/10 hover:text-white sm:px-6 sm:py-3 sm:text-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#7F56D9]" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
