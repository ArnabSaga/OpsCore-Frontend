import { CalendarDays } from "lucide-react";

import TaskCalendarEventCard from "@/components/features/task/components/TaskCalendarEventCard";
import type { TaskSummary } from "@/types/task.types";

type TaskCalendarSidebarProps = {
  selectedDate: string | null;
  tasks: TaskSummary[];
  onOpenTask: (taskId: string) => void;
};

const formatFullDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const TaskCalendarSidebar = ({ selectedDate, tasks, onOpenTask }: TaskCalendarSidebarProps) => {
  return (
    <aside
      data-task-calendar-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-[#CBB5FF]" />
        <h2 className="text-lg font-semibold text-white">
          {selectedDate ? formatFullDate(selectedDate) : "Select a day"}
        </h2>
      </div>

      <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
        {selectedDate
          ? "Tasks scheduled for the selected date."
          : "Choose a day from the calendar to inspect scheduled task details."}
      </p>

      <div className="mt-5 space-y-3">
        {!selectedDate ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            No day selected yet.
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            No scheduled tasks for this day.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCalendarEventCard key={task.id} task={task} onOpen={onOpenTask} />
          ))
        )}
      </div>
    </aside>
  );
};

export default TaskCalendarSidebar;
