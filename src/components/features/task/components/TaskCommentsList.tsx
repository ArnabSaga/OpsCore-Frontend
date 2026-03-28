import type { TaskComment } from "@/types/task.types";
import TaskCommentCard from "./TaskCommentCard";

type TaskCommentsListProps = {
  taskId: string;
  comments: TaskComment[];
};

const TaskCommentsList = ({ taskId, comments }: TaskCommentsListProps) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <TaskCommentCard key={comment.id} taskId={taskId} comment={comment} />
      ))}
    </div>
  );
};

export default TaskCommentsList;
