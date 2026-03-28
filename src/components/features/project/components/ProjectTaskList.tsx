import type { TaskSummary } from "@/types/task.types";
import ProjectTaskCard from "./ProjectTaskCard";

type ProjectTaskListProps = {
  tasks: TaskSummary[];
  onOpen: (taskId: string) => void;
  onEdit: (task: TaskSummary) => void;
  onDelete: (task: TaskSummary) => void;
};

const ProjectTaskList = ({ tasks, onOpen, onEdit, onDelete }: ProjectTaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} data-project-task-card>
          <ProjectTaskCard task={task} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default ProjectTaskList;
