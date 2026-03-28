"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { useDeleteTaskComment } from "@/components/features/task/hooks/useDeleteTaskComment";
import { useUpdateTaskComment } from "@/components/features/task/hooks/useUpdateTaskComment";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { TaskComment } from "@/types/task.types";

type TaskCommentCardProps = {
  taskId: string;
  comment: TaskComment;
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

const TaskCommentCard = ({ taskId, comment }: TaskCommentCardProps) => {
  const { mutateAsync: updateComment, isPending: isUpdating } = useUpdateTaskComment();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteTaskComment();

  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(comment.body);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!body.trim()) return;

    setSubmitError(null);

    try {
      await updateComment({
        taskId,
        commentId: comment.id,
        payload: {
          body: body.trim(),
        },
      });

      setIsEditing(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to update comment.");
    }
  };

  const handleDelete = async () => {
    setSubmitError(null);

    try {
      await deleteComment({
        taskId,
        commentId: comment.id,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to delete comment.");
    }
  };

  return (
    <article
      data-task-comments-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{comment.user.name}</h3>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {formatDate(comment.createdAt)}
            {comment.updatedAt !== comment.createdAt ? " • edited" : ""}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setIsEditing((prev) => !prev);
              setBody(comment.body);
              setSubmitError(null);
            }}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Pencil className="mr-1 h-4 w-4" />
            {isEditing ? "Close" : "Edit"}
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-3">
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[120px] rounded-2xl border-white/10 bg-[#0C111D] text-white"
          />

          {submitError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {submitError}
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setBody(comment.body);
                setSubmitError(null);
              }}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>

            <AppSubmitButton
              type="button"
              isSubmitting={isUpdating}
              onClick={handleUpdate}
              disabled={!body.trim()}
              className="w-auto px-5"
            >
              Save
            </AppSubmitButton>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm leading-6 text-[#D0D5DD]">{comment.body}</p>

          {submitError ? (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {submitError}
            </div>
          ) : null}
        </>
      )}
    </article>
  );
};

export default TaskCommentCard;
