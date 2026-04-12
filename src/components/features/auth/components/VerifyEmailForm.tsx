"use client";

import { useGSAP } from "@gsap/react";
import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { ArrowRight, KeyRound, Mail, MailCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLFormElement | null>(null);
  const resendRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();
  const [error, setError] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!cardRef.current || typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const targets = [
        cardRef.current,
        headerRef.current,
        infoRef.current,
        formWrapRef.current,
        resendRef.current,
        footerRef.current,
      ].filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(cardRef.current, {
        y: 24,
        opacity: 0,
        scale: 0.985,
        duration: 0.62,
      });

      if (headerRef.current) {
        tl.from(
          headerRef.current,
          {
            y: 14,
            opacity: 0,
            duration: 0.36,
          },
          "-=0.3"
        );
      }

      if (infoRef.current) {
        tl.from(
          infoRef.current,
          {
            y: 12,
            opacity: 0,
            duration: 0.32,
          },
          "-=0.18"
        );
      }

      if (formWrapRef.current) {
        tl.from(
          formWrapRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.38,
          },
          "-=0.14"
        );
      }

      if (resendRef.current) {
        tl.from(
          resendRef.current,
          {
            y: 10,
            opacity: 0,
            duration: 0.28,
          },
          "-=0.12"
        );
      }

      if (footerRef.current) {
        tl.from(
          footerRef.current,
          {
            y: 10,
            opacity: 0,
            duration: 0.24,
          },
          "-=0.12"
        );
      }
    },
    { scope: cardRef }
  );

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);

      try {
        await verifyEmail({
          email: value.email.trim(),
          otp: value.otp.trim(),
        });

        router.replace("/login");
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to verify email. Please try again.");
        }
      }
    },
  });

  return (
    <Card
      ref={cardRef}
      className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-[24px] lg:max-h-[calc(100dvh-4rem)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/55 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[#7F56D9]/10 blur-3xl sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <CardHeader
        ref={headerRef}
        className="relative shrink-0 px-4 pb-4 pt-5 sm:px-5 sm:pb-4 sm:pt-6 lg:px-6"
      >
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7F56D9]/25 blur-xl" />
            <div className="absolute inset-0 scale-110 rounded-full border border-white/10" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore Logo"
              width={64}
              height={64}
              className="relative mx-auto h-12 w-12 rounded-2xl sm:h-14 sm:w-14"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-[1.4rem] font-bold tracking-tight text-white sm:text-[1.75rem]">
              Verify your email
            </h1>
            <p className="mx-auto max-w-sm text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
              Enter the verification code sent to your email address to activate your OpsCore
              account securely.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-5 sm:px-5 sm:pb-6 lg:px-6">
        <div className="space-y-4 pr-1 sm:space-y-5">
          <div
            ref={infoRef}
            className="rounded-2xl border border-white/10 bg-white/4.5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-white/10 bg-[#7F56D9]/10 p-2.5">
                <MailCheck className="h-5 w-5 text-[#CBB5FF]" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white sm:text-[15px]">Check your inbox</p>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  We sent a verification code to your registered email. Enter it below to unlock
                  your account.
                </p>

                {emailFromQuery ? (
                  <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#E5E7EB] sm:text-sm">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#CBB5FF]" />
                    <span className="truncate">{emailFromQuery}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
            ref={formWrapRef}
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Email is required";
                  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  if (!isValidEmail) return "Enter a valid email address";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email address"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  icon={<Mail className="h-4 w-4 text-[#94A3B8]" />}
                />
              )}
            </form.Field>

            <form.Field
              name="otp"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Verification code is required";
                  if (value.trim().length < 4) return "Enter a valid verification code";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Verification code"
                  type="text"
                  placeholder="Enter verification code"
                  autoComplete="one-time-code"
                  icon={<KeyRound className="h-4 w-4 text-[#94A3B8]" />}
                />
              )}
            </form.Field>

            <div className="rounded-2xl border border-white/8 bg-white/3 p-3.5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <ShieldCheck className="h-4 w-4 text-[#12B76A]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Protected verification flow</p>
                  <p className="mt-1 text-xs leading-5 text-[#94A3B8] sm:text-sm">
                    This step confirms ownership of your email and helps secure workspace access
                    before login.
                  </p>
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <div className="pt-1">
              <AppSubmitButton isSubmitting={isPending}>Verify email</AppSubmitButton>
            </div>
          </form>

          <div
            ref={resendRef}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Didn&apos;t get the code?</p>
              <p className="mt-1 text-xs leading-5 text-[#94A3B8] sm:text-sm">
                Request a new verification code and continue your secure onboarding flow.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-10 rounded-2xl border-white/10 bg-white/5 px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-white/15 hover:bg-white/10"
            >
              <Link
                href={`/resend-verification${emailFromQuery ? `?email=${encodeURIComponent(emailFromQuery)}` : ""}`}
                className="inline-flex items-center gap-2"
              >
                Resend code
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter
        ref={footerRef}
        className="justify-center border-t border-white/10 px-4 py-4 sm:px-5 lg:px-6"
      >
        <p className="text-center text-sm leading-6 text-[#94A3B8]">
          Already verified?
          <Link
            href="/login"
            className="ml-2 font-semibold text-white underline-offset-4 transition-colors hover:text-[#CBB5FF] hover:underline"
          >
            Go to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;
