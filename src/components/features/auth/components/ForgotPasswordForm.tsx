"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";

  const { mutateAsync: requestReset, isPending } = useForgotPassword();

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
      className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7F56D9]/25 blur-xl" />
            <Image
              src="/icons/logo.svg"
              alt="OpsCore Logo"
              width={64}
              height={64}
              style={{ width: "auto", height: "auto" }}
              className="relative mx-auto rounded-2xl"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Forgot your password?</h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Enter your email address and we&apos;ll send reset instructions to help you recover
              access.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#7F56D9]/10 p-2">
              <ShieldAlert className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Account recovery</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                We&apos;ll send a password reset email so you can securely create a new password.
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
            <AppSubmitButton isSubmitting={isPending}>Send reset instructions</AppSubmitButton>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
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
