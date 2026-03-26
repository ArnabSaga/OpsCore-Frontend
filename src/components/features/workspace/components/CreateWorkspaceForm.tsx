"use client";

import { useForm } from "@tanstack/react-form";
import gsap from "gsap";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, FolderPlus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AppField from "@/components/form/AppField";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateWorkspace } from "@/components/features/workspace/hooks/useCreateWorkspace";
import { createWorkspaceSchema } from "@/components/features/workspace/validations/workspace.validation";

const CreateWorkspaceForm = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-create-workspace-hero]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-create-workspace-card]",
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);

      const parsed = createWorkspaceSchema.safeParse(value);

      if (!parsed.success) {
        return;
      }

      try {
        const createdWorkspace = await createWorkspace({
          name: parsed.data.name,
        });

        router.replace(`/workspaces/${createdWorkspace.id}`);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          setSubmitError(error.message);
        } else {
          setSubmitError("Failed to create workspace. Please try again.");
        }
      }
    },
  });

  return (
    <div ref={containerRef} className="space-y-8">
      <section
        data-create-workspace-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              New Workspace
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Create a new workspace
              </h1>
              <p className="max-w-xl text-sm leading-6 text-[#94A3B8] md:text-base">
                Set up a new tenant space for your team, projects, operations, and future billing
                workflows inside OpsCore.
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/workspaces">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Workspaces
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card
          data-create-workspace-card
          className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
                <FolderPlus className="h-5 w-5 text-[#CBB5FF]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Workspace details</h2>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  Start with a strong workspace name. OpsCore will generate the slug automatically
                  from it.
                </p>
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
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const parsed = createWorkspaceSchema.shape.name.safeParse(value);
                    if (!parsed.success) {
                      return parsed.error.issues[0]?.message ?? "Invalid workspace name";
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
                    icon={<BriefcaseBusiness className="h-4 w-4 text-[#94A3B8]" />}
                  />
                )}
              </form.Field>

              {submitError ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {submitError}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href="/workspaces">Cancel</Link>
                </Button>

                <div className="flex-1">
                  <AppSubmitButton isSubmitting={isPending}>Create Workspace</AppSubmitButton>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10">
              <CheckCircle2 className="h-5 w-5 text-[#6CE9A6]" />
            </div>

            <h3 className="text-lg font-semibold text-white">What happens next</h3>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
              After creation, OpsCore will automatically make you the workspace owner and redirect
              you to the workspace details page.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Owner access</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  You will have full control over members, invitations, billing, and workspace
                  management.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Auto-generated slug</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  The backend creates a clean unique slug from your workspace name, so you do not
                  need to manage it manually.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Trial & plan context</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Your workspace starts with the backend plan logic already applied, including trial
                  metadata when available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateWorkspaceForm;
