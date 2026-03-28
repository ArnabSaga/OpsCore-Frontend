import type { TaskStatus, TaskSummary } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";
import TaskBoardCard from "./TaskBoardCard";

type TaskBoardColumnProps = {
  status: TaskStatus;
  tasks: TaskSummary[];
  workspaceMembers: WorkspaceMember[];
  onOpenTask: (taskId: string) => void;
};

const COLUMN_META: Record<TaskStatus, { title: string; accent: string; description: string }> = {
  TODO: {
    title: "To Do",
    accent: "from-slate-500/20 to-slate-700/10",
    description: "Planned work not started yet",
  },
  IN_PROGRESS: {
    title: "In Progress",
    accent: "from-[#7F56D9]/20 to-[#6941C6]/10",
    description: "Currently being worked on",
  },
  REVIEW: {
    title: "Review",
    accent: "from-amber-500/20 to-amber-700/10",
    description: "Needs review or approval",
  },
  DONE: {
    title: "Done",
    accent: "from-[#12B76A]/20 to-emerald-700/10",
    description: "Completed delivery items",
  },
};

const TaskBoardColumn = ({ status, tasks, workspaceMembers, onOpenTask }: TaskBoardColumnProps) => {
  const meta = COLUMN_META[status];

  return (
    <section
      data-task-board-column
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-4 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className={`rounded-[18px] border border-white/10 bg-linear-to-br ${meta.accent} p-4`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">{meta.title}</h2>
            <p className="mt-1 text-xs text-[#94A3B8]">{meta.description}</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white">
            {tasks.length}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-white/10 bg-white/5 p-4 text-center text-sm text-[#94A3B8]">
            No tasks in this column
          </div>
        ) : (
          tasks.map((task) => (
            <TaskBoardCard
              key={task.id}
              task={task}
              workspaceMembers={workspaceMembers}
              onOpen={onOpenTask}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TaskBoardColumn;
