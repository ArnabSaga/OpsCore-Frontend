import type { TaskSummary } from "@/types/task.types";
import type { WorkspaceMember } from "@/types/workspace.types";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: TaskSummary[];
  workspaceMembers: WorkspaceMember[];
  onOpen: (taskId: string) => void;
  onEdit: (task: TaskSummary) => void;
  onDelete: (task: TaskSummary) => void;
};

const TaskList = ({ tasks, workspaceMembers, onOpen, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} data-task-card>
          <TaskCard
            task={task}
            workspaceMembers={workspaceMembers}
            onOpen={onOpen}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
