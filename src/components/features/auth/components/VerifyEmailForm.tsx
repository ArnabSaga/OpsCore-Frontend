"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { KeyRound, MailCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

const VerifyEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();
  const [error, setError] = useState<string | null>(null);

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
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await verifyEmail({
          email: value.email,
          otp: value.otp,
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
            <h1 className="text-3xl font-bold tracking-tight text-white">Verify your email</h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Enter the verification code sent to your email address to activate your account.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#7F56D9]/10 p-2">
              <MailCheck className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Check your inbox</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                We sent a verification code to your registered email. Use it below to continue.
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

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="pt-1">
            <AppSubmitButton isSubmitting={isPending}>Verify email</AppSubmitButton>
          </div>
        </form>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/2 p-4">
          <div>
            <p className="text-sm font-medium text-white">Didn&apos;t get the code?</p>
            <p className="text-xs text-[#94A3B8]">Resend a new verification code to your email.</p>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link
              href={`/resend-verification${emailFromQuery ? `?email=${encodeURIComponent(emailFromQuery)}` : ""}`}
            >
              Resend
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
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
