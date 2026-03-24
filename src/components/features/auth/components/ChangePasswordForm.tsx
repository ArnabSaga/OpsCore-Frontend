"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePasswordForm = () => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: changePassword, isPending } = useChangePassword();

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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      if (value.newPassword !== value.confirmPassword) {
        setError("New passwords do not match");
        return;
      }

      try {
        await changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
        });

        router.replace("/login?message=Password changed successfully. Please login with your new password.");
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to change password. Please try again.");
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
            <h1 className="text-3xl font-bold tracking-tight text-white">Change password</h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Update your account password to maintain security.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#7F56D9]/10 p-2">
              <ShieldCheck className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Security Update</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Choose a strong, unique password to keep your account safe.
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
            name="currentPassword"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Current password is required";
                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Current password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                autoComplete="current-password"
                icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
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
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                if (!value) return "Please confirm your new password";
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
            <AppSubmitButton isSubmitting={isPending}>Update password</AppSubmitButton>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
          Changed your mind?
          <Link
            href="/dashboard"
            className="ml-2 font-semibold text-white underline-offset-4 transition-colors hover:text-[#CBB5FF] hover:underline"
          >
            Back to dashboard
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
