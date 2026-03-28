"use client";

import { ArrowLeft, Pencil, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TaskFormHeaderProps = {
  mode: "create" | "edit";
};

const TaskFormHeader = ({ mode }: TaskFormHeaderProps) => {
  const isCreate = mode === "create";

  return (
    <section
      data-task-form-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            {isCreate ? "New task" : "Edit task"}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {isCreate ? "Create a new task" : "Update task details"}
            </h1>
            <p className="max-w-xl text-sm leading-6 text-[#94A3B8] md:text-base">
              {isCreate
                ? "Create delivery work across projects with clear ownership, priority, and deadlines."
                : "Keep the task aligned with the current project scope, owner, status, and due date."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/tasks">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </Link>
          </Button>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#D0D5DD]">
            {isCreate ? (
              <Plus className="h-4 w-4 text-[#CBB5FF]" />
            ) : (
              <Pencil className="h-4 w-4 text-[#CBB5FF]" />
            )}
            Backend-aligned task form
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskFormHeader;
