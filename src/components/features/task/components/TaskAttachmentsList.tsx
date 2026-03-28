import type { TaskAttachment } from "@/types/task.types";
import TaskAttachmentCard from "./TaskAttachmentCard";

type TaskAttachmentsListProps = {
  taskId: string;
  attachments: TaskAttachment[];
};

const TaskAttachmentsList = ({ taskId, attachments }: TaskAttachmentsListProps) => {
  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <TaskAttachmentCard key={attachment.id} taskId={taskId} attachment={attachment} />
      ))}
    </div>
  );
};

export default TaskAttachmentsList;
