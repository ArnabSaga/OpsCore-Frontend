"use client";

import { Paperclip, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

import { useDeleteTaskAttachment } from "@/components/features/task/hooks/useDeleteTaskAttachment";
import { useTaskAttachments } from "@/components/features/task/hooks/useTaskAttachments";
import { useUploadTaskAttachment } from "@/components/features/task/hooks/useUploadTaskAttachment";
import { Button } from "@/components/ui/button";
import type { TaskAttachment } from "@/types/task.types";

type TaskAttachmentsSectionProps = {
  taskId: string;
};

const formatFileSize = (size?: number | null) => {
  if (!size && size !== 0) return "Unknown size";
  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const TaskAttachmentsSection = ({ taskId }: TaskAttachmentsSectionProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useTaskAttachments({
    taskId,
    params: { page: 1, limit: 20 },
    enabled: !!taskId,
  });

  const { mutateAsync: uploadAttachment, isPending: isUploading } = useUploadTaskAttachment();
  const { mutateAsync: deleteAttachment, isPending: isDeleting } = useDeleteTaskAttachment();

  const attachments = data?.data ?? [];

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadAttachment({ taskId, file });
    event.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-[#CBB5FF]" />
            <h3 className="text-sm font-semibold text-white">Attachments</h3>
          </div>

          <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {attachments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#101828]/80 p-4 text-sm text-[#94A3B8]">
            No attachments yet.
          </div>
        ) : (
          <div className="space-y-3">
            {attachments.map((attachment: TaskAttachment) => (
              <div
                key={attachment.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#101828]/80 p-4 md:flex-row md:items-center md:justify-between"
              >
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

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isDeleting}
                  onClick={() => deleteAttachment({ taskId, attachmentId: attachment.id })}
                  className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskAttachmentsSection;
