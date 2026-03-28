"use client";

import { Plus, Sparkles, SquareKanban } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TaskBoardHeaderProps = {
  totalTasks: number;
};

const TaskBoardHeader = ({ totalTasks }: TaskBoardHeaderProps) => {
  return (
    <section
      data-task-board-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Task board
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Visualize task flow
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Monitor work grouped by status across your workspace. This board is read-only for
              layout, with optional quick status updates instead of drag-and-drop persistence.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#D0D5DD]">
            <SquareKanban className="h-4 w-4 text-[#CBB5FF]" />
            {totalTasks} tasks on board
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/tasks">Back to Tasks</Link>
          </Button>

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

export default TaskBoardHeader;
