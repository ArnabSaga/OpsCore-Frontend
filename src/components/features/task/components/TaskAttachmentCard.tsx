"use client";

import { Paperclip, Trash2 } from "lucide-react";

import { useDeleteTaskAttachment } from "@/components/features/task/hooks/useDeleteTaskAttachment";
import { Button } from "@/components/ui/button";
import type { TaskAttachment } from "@/types/task.types";
import { useState } from "react";

type TaskAttachmentCardProps = {
  taskId: string;
  attachment: TaskAttachment;
};

const formatFileSize = (size?: number | null) => {
  if (!size && size !== 0) return "Unknown size";
  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
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

const TaskAttachmentCard = ({ taskId, attachment }: TaskAttachmentCardProps) => {
  const { mutateAsync, isPending } = useDeleteTaskAttachment();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);

    try {
      await mutateAsync({
        taskId,
        attachmentId: attachment.id,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete attachment.");
    }
  };

  return (
    <article
      data-task-attachments-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D]">
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

            <p className="mt-1 text-xs text-[#667085]">{formatDate(attachment.createdAt)}</p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={handleDelete}
          className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}
    </article>
  );
};

export default TaskAttachmentCard;
