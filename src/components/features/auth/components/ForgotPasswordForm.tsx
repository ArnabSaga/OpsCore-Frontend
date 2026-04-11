"use client";

import { useGSAP } from "@gsap/react";
import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";

  const { mutateAsync: requestReset, isPending } = useForgotPassword();

  useGSAP(
    () => {
      if (!cardRef.current || typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const targets = [
        cardRef.current,
        headerRef.current,
        infoRef.current,
        formWrapRef.current,
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
        y: 20,
        opacity: 0,
        scale: 0.988,
        duration: 0.56,
      });

      if (headerRef.current) {
        tl.from(
          headerRef.current,
          {
            y: 14,
            opacity: 0,
            duration: 0.34,
          },
          "-=0.26"
        );
      }

      if (infoRef.current) {
        tl.from(
          infoRef.current,
          {
            y: 10,
            opacity: 0,
            duration: 0.3,
          },
          "-=0.14"
        );
      }

      if (formWrapRef.current) {
        tl.from(
          formWrapRef.current,
          {
            y: 14,
            opacity: 0,
            duration: 0.36,
          },
          "-=0.1"
        );
      }

      if (footerRef.current) {
        tl.from(
          footerRef.current,
          {
            y: 8,
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
    },
    onSubmit: async ({ value }) => {
      const normalizedEmail = value.email.trim().toLowerCase();

      await requestReset({
        email: normalizedEmail,
      });

      toast.success("Password reset code sent to your email.");
      router.replace(`/reset-password?email=${encodeURIComponent(normalizedEmail)}`);
      router.refresh();
    },
  });

  return (
    <Card
      ref={cardRef}
      className="relative w-full max-w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:rounded-[22px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/55 to-transparent" />
      <div className="pointer-events-none absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#7F56D9]/10 blur-3xl sm:h-32 sm:w-32" />

      <CardHeader ref={headerRef} className="relative px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7F56D9]/25 blur-xl" />
            <div className="absolute inset-0 scale-110 rounded-full border border-white/10" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore Logo"
              width={56}
              height={56}
              className="relative mx-auto h-11 w-11 rounded-2xl sm:h-12 sm:w-12"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-[1.25rem] font-bold tracking-tight text-white sm:text-[1.55rem]">
              Forgot your password?
            </h1>
            <p className="mx-auto max-w-xs text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
              Enter your email address and we&apos;ll send reset instructions to help you recover
              access.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4 px-4 pb-4 sm:px-5 sm:pb-5">
        <div
          ref={infoRef}
          className="rounded-xl border border-white/8 bg-white/3 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#7F56D9]/10 p-2">
              <ShieldAlert className="h-4.5 w-4.5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Account recovery</p>
              <p className="mt-1 text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
                We&apos;ll send a password reset email so you can securely create a new password.
              </p>
            </div>
          </div>
        </div>

        <div ref={formWrapRef}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Email is required";
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

            <div className="pt-1">
              <AppSubmitButton isSubmitting={isPending}>Send reset instructions</AppSubmitButton>
            </div>
          </form>
        </div>
      </CardContent>

      <CardFooter
        ref={footerRef}
        className="justify-center border-t border-white/10 px-4 py-3.5 sm:px-5 sm:py-4"
      >
        <p className="text-center text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
          Remembered your password?
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

export default ForgotPasswordForm;
