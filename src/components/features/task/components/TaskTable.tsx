import { CalendarClock, Pencil, Trash2 } from "lucide-react";

import TaskAssigneeAvatar from "@/components/features/task/components/TaskAssigneeAvatar";
import TaskPriorityBadge from "@/components/features/task/components/TaskPriorityBadge";
import TaskStatusBadge from "@/components/features/task/components/TaskStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TaskSummary } from "@/types/task.types";

type TaskTableProps = {
  tasks: TaskSummary[];
  onOpen: (taskId: string) => void;
  onEdit: (task: TaskSummary) => void;
  onDelete: (task: TaskSummary) => void;
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const TaskTable = ({ tasks, onOpen, onEdit, onDelete }: TaskTableProps) => {
  return (
    <div
      data-task-card
      className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/80 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="px-6 text-[#94A3B8]">Task</TableHead>
            <TableHead className="text-[#94A3B8]">Project</TableHead>
            <TableHead className="text-[#94A3B8]">Status</TableHead>
            <TableHead className="text-[#94A3B8]">Priority</TableHead>
            <TableHead className="text-[#94A3B8]">Assignee</TableHead>
            <TableHead className="text-[#94A3B8]">Due</TableHead>
            <TableHead className="px-6 text-right text-[#94A3B8]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-white/10 text-white hover:bg-white/5">
              <TableCell className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => onOpen(task.id)}
                  className="max-w-[260px] truncate text-left text-sm font-semibold text-white hover:text-[#CBB5FF]"
                >
                  {task.title}
                </button>
                <p className="mt-1 max-w-[360px] truncate text-xs text-[#94A3B8]">
                  {task.description || "No description"}
                </p>
              </TableCell>

              <TableCell className="text-[#D0D5DD]">{task.project.name}</TableCell>

              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>

              <TableCell>
                <TaskPriorityBadge priority={task.priority} />
              </TableCell>

              <TableCell>
                <TaskAssigneeAvatar user={task.assignedToUser} />
              </TableCell>

              <TableCell>
                <div className="inline-flex items-center gap-2 text-sm text-[#D0D5DD]">
                  <CalendarClock className="h-4 w-4 text-[#94A3B8]" />
                  {formatDate(task.dueDate)}
                </div>
              </TableCell>

              <TableCell className="px-6 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => onOpen(task.id)}
                    className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                  >
                    Open
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(task)}
                    className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(task)}
                    className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
