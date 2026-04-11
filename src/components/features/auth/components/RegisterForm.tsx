"use client";

import { useGSAP } from "@gsap/react";
import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Building2, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { getApiUrl } from "@/lib/get-api-url";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const socialWrapRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: registerUser, isPending } = useRegister();

  useGSAP(
    () => {
      if (!cardRef.current || typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const targets = [
        cardRef.current,
        headerRef.current,
        socialWrapRef.current,
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
        y: 24,
        opacity: 0,
        scale: 0.985,
        duration: 0.62,
      });

      if (headerRef.current) {
        tl.from(
          headerRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.38,
          },
          "-=0.3"
        );
      }

      if (socialWrapRef.current) {
        tl.from(
          socialWrapRef.current,
          {
            y: 12,
            opacity: 0,
            duration: 0.34,
          },
          "-=0.16"
        );
      }

      if (formWrapRef.current) {
        tl.from(
          formWrapRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.4,
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
            duration: 0.28,
          },
          "-=0.14"
        );
      }
    },
    { scope: cardRef }
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      workspaceName: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      if (value.password !== value.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        await registerUser({
          name: value.name,
          email: value.email,
          password: value.password,
          confirmPassword: value.confirmPassword,
          workspaceName: value.workspaceName,
        });

        router.replace(`/verify-email?email=${encodeURIComponent(value.email)}`);
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to create account. Please try again.");
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
              Create your account
            </h1>
            <p className="mx-auto max-w-sm text-[13px] leading-6 text-[#94A3B8] sm:text-sm">
              Set up your OpsCore account and start managing your workspace with confidence.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent
        ref={formWrapRef}
        className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-5 sm:px-5 sm:pb-6 lg:px-6"
      >
        <div className="space-y-4 pr-1 sm:space-y-5">
          <div ref={socialWrapRef}>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              aria-busy={isPending}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/15 hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(127,86,217,0.12)] sm:h-11 sm:text-[15px]"
              onClick={() => {
                window.location.href = getApiUrl(API_ENDPOINTS.auth.googleLogin);
              }}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="truncate">Continue with Google</span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#667085] sm:text-xs">
              Or continue with email
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Full name is required";
                  if (value.trim().length < 2) return "Name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Full name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  icon={<User className="h-4 w-4 text-[#94A3B8]" />}
                />
              )}
            </form.Field>

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
              name="workspaceName"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Workspace name is required";
                  if (value.trim().length < 2)
                    return "Workspace name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Workspace name"
                  type="text"
                  placeholder="Enter your workspace name"
                  autoComplete="organization"
                  icon={<Building2 className="h-4 w-4 text-[#94A3B8]" />}
                />
              )}
            </form.Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Password is required";
                    if (value.length < 8) return "Password must be at least 8 characters";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    autoComplete="new-password"
                    icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                    endAdornment={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-[#94A3B8] transition-colors hover:text-white"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />
                )}
              </form.Field>

              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    if (!value) return "Please confirm your password";

                    const password = fieldApi.form.getFieldValue("password");
                    if (value !== password) return "Passwords do not match";

                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                    endAdornment={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="text-[#94A3B8] transition-colors hover:text-white"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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
            </div>

            <form.Field
              name="agreeToTerms"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "You must agree to the terms and conditions";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3 text-[13px] text-[#94A3B8] sm:text-sm">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      onBlur={field.handleBlur}
                      className="mt-0.5 h-4 w-4 rounded border-white/15 bg-transparent accent-[#7F56D9]"
                    />
                    <span className="leading-6">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-[#CBB5FF] transition-colors hover:text-white"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-[#CBB5FF] transition-colors hover:text-white"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <div className="min-h-[20px] px-1">
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
                      <p className="text-xs text-red-400">{String(field.state.meta.errors[0])}</p>
                    ) : null}
                  </div>
                </div>
              )}
            </form.Field>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <div className="pt-1">
              <AppSubmitButton isSubmitting={isPending}>Create account</AppSubmitButton>
            </div>
          </form>
        </div>
      </CardContent>

      <CardFooter
        ref={footerRef}
        className="justify-center border-t border-white/10 px-4 py-4 sm:px-5 lg:px-6"
      >
        <p className="text-center text-sm leading-6 text-[#94A3B8]">
          Already have an account?
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

export default RegisterForm;
