"use client";

import { useForm } from "@tanstack/react-form";
import { gsap } from "gsap";
import { Building2, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AppField from "@/components/forms/AppField";
import AppSubmitButton from "@/components/forms/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync: registerUser, isPending } = useRegister();

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
      name: "",
      email: "",
      workspaceName: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await registerUser({
        name: value.name,
        email: value.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
        workspaceName: value.workspaceName,
      });

      router.replace("/login");
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
              style={{ width: "auto", height: "auto" }}
              className="relative mx-auto rounded-2xl"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create your account</h1>
            <p className="text-sm leading-6 text-[#94A3B8]">
              Set up your OpsCore account and start managing your workspace.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10"
          onClick={() => {
            const googleRegisterUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL;

            if (googleRegisterUrl) {
              window.location.href = googleRegisterUrl;
            }
          }}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#667085]">
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
          className="space-y-5"
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
                if (value.trim().length < 2) {
                  return "Workspace name must be at least 2 characters";
                }
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
                placeholder="Create a strong password"
                autoComplete="new-password"
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
                placeholder="Re-enter your password"
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
                <label className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    onBlur={field.handleBlur}
                    className="mt-0.5 h-4 w-4 rounded border-white/15 bg-transparent accent-[#7F56D9]"
                  />
                  <span>
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

                <div className="min-h-[20px]">
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
                    <p className="text-xs text-red-400">{String(field.state.meta.errors[0])}</p>
                  ) : null}
                </div>
              </div>
            )}
          </form.Field>

          <div className="pt-1">
            <AppSubmitButton isSubmitting={isPending}>Create account</AppSubmitButton>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-white/10 py-5">
        <p className="text-center text-sm text-[#94A3B8]">
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
