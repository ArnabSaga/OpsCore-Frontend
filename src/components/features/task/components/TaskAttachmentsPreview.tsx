import { ArrowRight, Paperclip } from "lucide-react";
import Link from "next/link";

import ProjectSectionCard from "@/components/features/project/components/ProjectSectionCard";
import { Button } from "@/components/ui/button";
import type { TaskAttachment } from "@/types/task.types";

type TaskAttachmentsPreviewProps = {
  taskId: string;
  attachments: TaskAttachment[];
};

const formatFileSize = (size?: number | null) => {
  if (!size && size !== 0) return "Unknown size";
  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const TaskAttachmentsPreview = ({ taskId, attachments }: TaskAttachmentsPreviewProps) => {
  const previewAttachments = attachments.slice(0, 3);

  return (
    <ProjectSectionCard
      title="Recent attachments"
      description="A quick preview of files uploaded to this task."
      action={
        <Button
          asChild
          variant="outline"
          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href={`/tasks/${taskId}/attachments`}>
            View all attachments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {previewAttachments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-[#94A3B8]">
          No attachments uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {previewAttachments.map((attachment) => (
            <div key={attachment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#101828]">
                  <Paperclip className="h-4 w-4 text-[#CBB5FF]" />
                </div>

                <div className="min-w-0">
                  <a
                    href={attachment.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-sm font-semibold text-white hover:text-[#CBB5FF]"
                  >
                    {attachment.fileName}
                  </a>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {formatFileSize(attachment.fileSize)} • Uploaded by {attachment.uploadedBy.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ProjectSectionCard>
  );
};

export default TaskAttachmentsPreview;
