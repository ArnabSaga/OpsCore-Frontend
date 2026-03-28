"use client";

import { MessageSquareText, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { useCreateTaskComment } from "@/components/features/task/hooks/useCreateTaskComment";
import { useDeleteTaskComment } from "@/components/features/task/hooks/useDeleteTaskComment";
import { useTaskComments } from "@/components/features/task/hooks/useTaskComments";
import { useUpdateTaskComment } from "@/components/features/task/hooks/useUpdateTaskComment";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { TaskComment } from "@/types/task.types";

type TaskCommentsSectionProps = {
  taskId: string;
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

const TaskCommentsSection = ({ taskId }: TaskCommentsSectionProps) => {
  const { data } = useTaskComments({
    taskId,
    params: { page: 1, limit: 20 },
    enabled: !!taskId,
  });

  const { mutateAsync: createComment, isPending: isCreating } = useCreateTaskComment();
  const { mutateAsync: updateComment, isPending: isUpdating } = useUpdateTaskComment();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteTaskComment();

  const [body, setBody] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingBody, setEditingBody] = useState("");

  const comments = data?.data ?? [];

  const handleCreate = async () => {
    if (!body.trim()) return;
    await createComment({ taskId, payload: { body: body.trim() } });
    setBody("");
  };

  const handleUpdate = async () => {
    if (!editingCommentId || !editingBody.trim()) return;
    await updateComment({
      taskId,
      commentId: editingCommentId,
      payload: { body: editingBody.trim() },
    });
    setEditingCommentId(null);
    setEditingBody("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <MessageSquareText className="h-4 w-4 text-[#CBB5FF]" />
          <h3 className="text-sm font-semibold text-white">Comments</h3>
        </div>

        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment"
          className="min-h-[100px] rounded-2xl border-white/10 bg-[#101828] text-white"
        />

        <div className="mt-3 flex justify-end">
          <AppSubmitButton
            type="button"
            isSubmitting={isCreating}
            onClick={handleCreate}
            disabled={!body.trim()}
            className="w-auto px-5"
          >
            Add Comment
          </AppSubmitButton>
        </div>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            No comments yet.
          </div>
        ) : (
          comments.map((comment: TaskComment) => (
            <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{comment.user.name}</p>
                  <p className="text-xs text-[#94A3B8]">{formatDate(comment.createdAt)}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingBody(comment.body);
                    }}
                    className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isDeleting}
                    onClick={() => deleteComment({ taskId, commentId: comment.id })}
                    className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>

              {editingCommentId === comment.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={editingBody}
                    onChange={(e) => setEditingBody(e.target.value)}
                    className="min-h-[100px] rounded-2xl border-white/10 bg-[#101828] text-white"
                  />
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditingBody("");
                      }}
                      className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <AppSubmitButton
                      type="button"
                      isSubmitting={isUpdating}
                      onClick={handleUpdate}
                      disabled={!editingBody.trim()}
                      className="w-auto px-5"
                    >
                      Save
                    </AppSubmitButton>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-6 text-[#D0D5DD]">{comment.body}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskCommentsSection;
