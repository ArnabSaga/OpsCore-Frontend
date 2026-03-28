import { ArrowRight, MessageSquareText } from "lucide-react";
import Link from "next/link";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import { Button } from "@/components/ui/button";
import type { TaskComment } from "@/types/task.types";

type TaskCommentsPreviewProps = {
  taskId: string;
  comments: TaskComment[];
};

const formatDate = (value?: string | null) => {
  if (!value) return "Unknown time";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const TaskCommentsPreview = ({ taskId, comments }: TaskCommentsPreviewProps) => {
  const previewComments = comments.slice(0, 3);

  return (
    <ProjectSectionCard
      title="Recent comments"
      description="A lightweight preview of recent discussion on this task."
      action={
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href={`/tasks/${taskId}/comments`}>
            View all comments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {previewComments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[#94A3B8]">
          No comments added yet.
        </div>
      ) : (
        <div className="space-y-3">
          {previewComments.map((comment) => (
            <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
                <MessageSquareText className="h-4 w-4 text-[#CBB5FF]" />
                <span className="text-sm font-medium text-white">{comment.user.name}</span>
                <span className="text-xs text-[#667085]">• {formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-sm leading-6 text-[#D0D5DD]">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </ProjectSectionCard>
  );
};

export default TaskCommentsPreview;
