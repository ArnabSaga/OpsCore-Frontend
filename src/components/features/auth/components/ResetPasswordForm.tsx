"use client";

import { useGSAP } from "@gsap/react";
import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  const { mutateAsync: requestReset, isPending: isResending } = useForgotPassword();

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
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const normalizedEmail = value.email.trim().toLowerCase();
      const normalizedOtp = value.otp.trim();

      if (!normalizedEmail) {
        setError("Email is required");
        return;
      }

      if (value.newPassword !== value.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        await resetPassword({
          email: normalizedEmail,
          otp: normalizedOtp,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
        });

        toast.success("Password reset successful. Please log in.");
        router.replace(
          "/login?message=Password reset successfully. Please login with your new password."
        );
        router.refresh();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to reset password. Please try again.";
        setError(message);
        toast.error(message);
      }
    },
  });

  const handleResendCode = async () => {
    const currentEmail = form.getFieldValue("email")?.trim() || emailFromQuery.trim();
    const normalizedEmail = currentEmail.toLowerCase();

    if (!normalizedEmail) {
      const message = "Please enter your email first.";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      setError(null);
      await requestReset({ email: normalizedEmail });
      form.setFieldValue("email", normalizedEmail);
      toast.success("A new password reset code has been sent.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to resend verification code.";
      setError(message);
      toast.error(message);
    }
  };

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
              Reset password
            </h1>
            <p className="mx-auto max-w-xs text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
              Enter the verification code sent to your email and create a new password.
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
              <ShieldCheck className="h-4.5 w-4.5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Secure reset</p>
              <p className="mt-1 text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
                Use your code and choose a strong new password to restore account access securely.
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

            <form.Field
              name="otp"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Verification code is required";
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
                  inputClassName="pr-24"
                  endAdornment={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleResendCode}
                      disabled={isResending}
                      className="h-8 px-2 text-xs text-[#CBB5FF] hover:bg-transparent hover:text-white"
                    >
                      {isResending ? "Sending..." : "Resend"}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "New password is required";
                  if (value.length < 8) return "Password must be at least 8 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-[#94A3B8] transition-colors hover:text-white"
                      aria-label={showPassword ? "Hide new password" : "Show new password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ["newPassword"],
                onChange: ({ value, fieldApi }) => {
                  if (!value) return "Please confirm your password";
                  if (value !== fieldApi.form.getFieldValue("newPassword")) {
                    return "Passwords do not match";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm new password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-[#94A3B8] transition-colors hover:text-white"
                      aria-label={
                        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
              )}
            </form.Field>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <div className="pt-1">
              <AppSubmitButton isSubmitting={isPending}>Reset password</AppSubmitButton>
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

export default ResetPasswordForm;
