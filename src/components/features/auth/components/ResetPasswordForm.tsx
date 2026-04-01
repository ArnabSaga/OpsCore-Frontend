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
import { toast } from "sonner";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useResetPassword } from "../hooks/useResetPassword";

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
                inputClassName="pr-20"
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
              onChange: ({ value }) => {
                if (!value) return "Please confirm your password";
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

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="pt-1">
            <AppSubmitButton isSubmitting={isPending}>Reset password</AppSubmitButton>
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

export default ResetPasswordForm;
