"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TaskCalendarHeaderProps = {
  currentMonth: Date;
  totalTasks: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
};

const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

const TaskCalendarHeader = ({
  currentMonth,
  totalTasks,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: TaskCalendarHeaderProps) => {
  return (
    <section
      data-task-calendar-hero
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
            <Sparkles className="h-3.5 w-3.5" />
            Task calendar
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Plan tasks by due date
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              This calendar is powered by `GET /tasks` and shows only tasks with due dates inside
              the selected month.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#D0D5DD]">
            <CalendarDays className="h-4 w-4 text-[#CBB5FF]" />
            {totalTasks} scheduled tasks
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onPreviousMonth}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
              {formatMonth(currentMonth)}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={onNextMonth}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onToday}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Today
            </Button>

            <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
              <Link href="/tasks/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskCalendarHeader;
