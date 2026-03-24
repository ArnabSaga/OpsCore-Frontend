"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useResetPassword } from "../hooks/useResetPassword";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const emailFromQuery = searchParams.get("email") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  const { mutateAsync: requestReset, isPending: isResending } = useForgotPassword();

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
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      if (value.newPassword !== value.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        await resetPassword({
          email: value.email,
          otp: value.otp,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
        });

        router.replace("/login?message=Password reset successfully. Please login with your new password.");
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to reset password. Please try again.");
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
              style={{ width: "auto", height: "auto" }}
              className="relative mx-auto rounded-2xl"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Reset password</h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Enter the verification code sent to your email and create a new password.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
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
                placeholder="Confirm new password"
                autoComplete="new-password"
                icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            )}
          </form.Field>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="pt-1">
            <AppSubmitButton isSubmitting={isPending}>Reset password</AppSubmitButton>
          </div>
        </form>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/2 p-4">
          <div>
            <p className="text-sm font-medium text-white">Didn&apos;t get the code?</p>
            <p className="text-xs text-[#94A3B8]">Resend a new verification code to your email.</p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isResending}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50"
            onClick={async () => {
              setError(null);
              try {
                await requestReset({ email: emailFromQuery });
                // Optional: show a small toast or temporary success message
              } catch (err: unknown) {
                if (err instanceof Error) {
                   setError(err.message);
                }
              }
            }}
          >
            {isResending ? "Resending..." : "Resend"}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
          Back to
          <Link
            href="/login"
            className="ml-2 font-semibold text-white underline-offset-4 transition-colors hover:text-[#CBB5FF] hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
