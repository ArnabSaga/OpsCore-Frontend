"use client";

import TaskCalendarEventCard from "@/components/features/task/components/TaskCalendarEventCard";
import { cn } from "@/lib/utils";
import type { TaskSummary } from "@/types/task.types";

type TaskCalendarGridProps = {
  currentMonth: Date;
  selectedDate: string | null;
  tasksByDate: Record<string, TaskSummary[]>;
  onSelectDate: (date: string) => void;
  onOpenTask: (taskId: string) => void;
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getCalendarDays = (currentMonth: Date) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const days: Date[] = [];
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const TaskCalendarGrid = ({
  currentMonth,
  selectedDate,
  tasksByDate,
  onSelectDate,
  onOpenTask,
}: TaskCalendarGridProps) => {
  const today = new Date();
  const days = getCalendarDays(currentMonth);

  return (
    <section
      data-task-calendar-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="mb-4 grid grid-cols-7 gap-3">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dayKey = day.toISOString().slice(0, 10);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate === dayKey;
          const tasks = tasksByDate[dayKey] ?? [];

          return (
            <button
              key={dayKey}
              type="button"
              onClick={() => onSelectDate(dayKey)}
              className={cn(
                "min-h-[140px] rounded-[20px] border p-3 text-left transition-all duration-200",
                isSelected
                  ? "border-[#7F56D9]/40 bg-[#7F56D9]/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
                !isCurrentMonth && "opacity-45"
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-white" : "text-[#D0D5DD]",
                    isToday && "text-[#CBB5FF]"
                  )}
                >
                  {day.getDate()}
                </span>

                {tasks.length > 0 ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-[#94A3B8]">
                    {tasks.length}
                  </span>
                ) : null}
              </div>

              <div className="space-y-2">
                {tasks.slice(0, 2).map((task) => (
                  <TaskCalendarEventCard key={task.id} task={task} compact onOpen={onOpenTask} />
                ))}

                {tasks.length > 2 ? (
                  <div className="px-1 text-[11px] font-medium text-[#94A3B8]">
                    +{tasks.length - 2} more
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TaskCalendarGrid;
