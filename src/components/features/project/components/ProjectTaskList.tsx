import type { BaseTaskUI } from "@/types/task.shared";
import ProjectTaskCard from "./ProjectTaskCard";

type ProjectTaskListProps = {
  tasks: BaseTaskUI[];
  onOpen: (taskId: string) => void;
  onEdit: (task: BaseTaskUI) => void;
  onDelete: (task: BaseTaskUI) => void;
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
