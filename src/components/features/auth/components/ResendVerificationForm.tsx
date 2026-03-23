"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Mail, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import AppField from "@/components/forms/AppField";
import AppSubmitButton from "@/components/forms/AppSubmitButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useResendVerificationCode } from "../hooks/useVerifyEmail";

const ResendVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";

  const { mutateAsync: resendCode, isPending } = useResendVerificationCode();

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 24, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
    },
    onSubmit: async ({ value }) => {
      await resendCode({
        email: value.email,
      });

      router.replace(`/verify-email?email=${encodeURIComponent(value.email)}`);
      router.refresh();
    },
  });

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7F56D9]/25 blur-xl" />
            <Image
              src="/icons/logo.png"
              alt="OpsCore Logo"
              width={84}
              height={84}
              style={{ width: "84px", height: "auto" }}
              className="relative mx-auto rounded-2xl"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Resend verification code
            </h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Enter your email address and we’ll send you a new verification code.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#7F56D9]/10 p-2">
              <RefreshCcw className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Need a fresh code?</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                We’ll send a new verification email so you can continue activation without delay.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
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
            <AppSubmitButton isSubmitting={isPending}>Send new code</AppSubmitButton>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
          Already have a code?
          <Link
            href={`/verify-email${emailFromQuery ? `?email=${encodeURIComponent(emailFromQuery)}` : ""}`}
            className="ml-2 font-semibold text-white underline-offset-4 transition-colors hover:text-[#CBB5FF] hover:underline"
          >
            Verify email
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ResendVerificationForm;
