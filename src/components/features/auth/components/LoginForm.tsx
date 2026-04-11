"use client";

import { useGSAP } from "@gsap/react";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { gsap } from "gsap";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { authQueryKeys } from "../hooks/auth.query-keys";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const socialWrapRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const message = searchParams.get("message");

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

      if (!targets.length) return;

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
            duration: 0.4,
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
            y: 14,
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
            y: 8,
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
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);
      setLoginError(null);

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          rememberMe: value.rememberMe,
        });

        if (error) {
          setLoginError(error.message || "Invalid email or password");
          setIsPending(false);
          return;
        }

        const user = data?.user;

        if (user && !user.emailVerified) {
          router.replace(`/verify-email?email=${encodeURIComponent(value.email)}`);
          setIsPending(false);
          return;
        }

        await queryClient.invalidateQueries({
          queryKey: authQueryKeys.all,
        });

        setIsPending(false);
        router.replace("/dashboard");
        router.refresh();
      } catch {
        setLoginError("An unexpected error occurred. Please try again.");
        setIsPending(false);
      }
    },
  });

  return (
    <Card
      ref={cardRef}
      className="relative w-full max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:rounded-[24px] lg:max-w-lg xl:max-w-134"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7F56D9]/60 to-transparent" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#7F56D9]/12 blur-3xl sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <CardHeader
        ref={headerRef}
        className="relative px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5 lg:px-6"
      >
        <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
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

          <div className="space-y-1.5">
            <h1 className="text-[1.4rem] font-bold tracking-tight text-white sm:text-[1.7rem] lg:text-[1.9rem]">
              Welcome back
            </h1>
            <p className="mx-auto max-w-sm text-xs leading-5 text-[#94A3B8] sm:text-sm sm:leading-6">
              Log in to your OpsCore workspace and continue managing operations.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4 px-4 pb-4 sm:space-y-5 sm:px-5 sm:pb-5 lg:px-6">
        <div ref={socialWrapRef}>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            aria-busy={isPending}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/15 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(127,86,217,0.12)] sm:h-11 sm:rounded-2xl sm:px-4 sm:text-[15px]"
            onClick={async () => {
              setLoginError(null);
              setIsPending(true);

              const { error } = await signInWithGoogle();

              if (error) {
                setLoginError(error.message || "Failed to continue with Google");
                setIsPending(false);
              }
            }}
          >
            <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" viewBox="0 0 24 24" aria-hidden="true">
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

        <div ref={formWrapRef} className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#667085] sm:text-xs">
              Or continue with email
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {message && !loginError ? (
            <div className="rounded-xl border border-[#12B76A]/20 bg-[#12B76A]/10 p-2.5 text-center text-xs text-[#12B76A] sm:rounded-2xl sm:p-3 sm:text-sm">
              {message}
            </div>
          ) : null}

          {loginError ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-center text-xs text-red-400 sm:rounded-2xl sm:p-3 sm:text-sm">
              {loginError}
            </div>
          ) : null}

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
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 6) return "Password must be at least 6 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  icon={<LockKeyhole className="h-4 w-4 text-[#94A3B8]" />}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-[#94A3B8] transition-colors hover:text-white"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              )}
            </form.Field>

            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex flex-col gap-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-xs text-[#94A3B8] sm:text-sm">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="h-4 w-4 rounded border-white/15 bg-transparent accent-[#7F56D9]"
                    />
                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#CBB5FF] transition-colors hover:text-white sm:text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </form.Field>

            <div className="pt-1">
              <AppSubmitButton isSubmitting={isPending}>Sign in</AppSubmitButton>
            </div>
          </form>
        </div>
      </CardContent>

      <CardFooter
        ref={footerRef}
        className="justify-center border-t border-white/10 px-4 py-4 sm:px-5 sm:py-5 lg:px-6"
      >
        <p className="text-center text-xs leading-5 text-[#94A3B8] sm:text-sm sm:leading-6">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="ml-2 font-semibold text-white underline-offset-4 transition-colors hover:text-[#CBB5FF] hover:underline"
          >
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
