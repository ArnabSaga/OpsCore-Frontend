"use client";

import { Plus, Sparkles, SquareKanban } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TaskListHeroProps = {
  totalTasks: number;
  openTasks: number;
  doneTasks: number;
};

const TaskListHero = ({ totalTasks, openTasks, doneTasks }: TaskListHeroProps) => {
  return (
    <section
      data-task-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Task operations
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Manage all tasks
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Search, filter, and monitor execution work across projects with a unified OpsCore task
              layer.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[#94A3B8]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <SquareKanban className="h-4 w-4 text-[#CBB5FF]" />
              <span>{totalTasks} total</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1.5 text-[#CBB5FF]">
              <span>{openTasks} open</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#12B76A]/20 bg-[#12B76A]/10 px-3 py-1.5 text-[#6CE9A6]">
              <span>{doneTasks} done</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            <Link href="/tasks/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TaskListHero;
