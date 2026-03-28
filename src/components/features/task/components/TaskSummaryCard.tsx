import { CalendarClock, CheckCircle2, MessageSquareText } from "lucide-react";

import ProjectMetricCard from "@/components/features/project/components/ProjectMetricCard";
import type { TaskDetails } from "@/types/task.types";

type TaskSummaryCardProps = {
  task: TaskDetails;
};

const formatDate = (value?: string | null) => {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const TaskSummaryCard = ({ task }: TaskSummaryCardProps) => {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div data-task-page-card>
        <ProjectMetricCard
          label="Status"
          value={task.status.replace("_", " ")}
          icon={<CheckCircle2 className="h-5 w-5" />}
          tone={task.status === "DONE" ? "success" : "primary"}
          helperText="Fetched from task details"
        />
      </div>

      <div data-task-page-card>
        <ProjectMetricCard
          label="Priority"
          value={task.priority}
          icon={<CheckCircle2 className="h-5 w-5" />}
          tone={task.priority === "URGENT" ? "warning" : "default"}
          helperText="Execution urgency"
        />
      </div>

      <div data-task-page-card>
        <ProjectMetricCard
          label="Comments"
          value={task._count.comments}
          icon={<MessageSquareText className="h-5 w-5" />}
          tone="default"
          helperText="Discussion activity"
        />
      </div>

      <div data-task-page-card>
        <ProjectMetricCard
          label="Due date"
          value={formatDate(task.dueDate)}
          icon={<CalendarClock className="h-5 w-5" />}
          tone="default"
          helperText={`${task._count.attachments} attachment${task._count.attachments === 1 ? "" : "s"}`}
        />
      </div>
    </section>
  );
};

export default TaskSummaryCard;
