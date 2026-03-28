"use client";

import { MessageSquarePlus } from "lucide-react";
import { useState } from "react";

import { useCreateTaskComment } from "@/components/features/task/hooks/useCreateTaskComment";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Textarea } from "@/components/ui/textarea";

type TaskCommentComposerProps = {
  taskId: string;
};

const TaskCommentComposer = ({ taskId }: TaskCommentComposerProps) => {
  const { mutateAsync, isPending } = useCreateTaskComment();
  const [body, setBody] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!body.trim()) return;

    setSubmitError(null);

    try {
      await mutateAsync({
        taskId,
        payload: {
          body: body.trim(),
        },
      });

      setBody("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to create comment.");
    }
  };

  return (
    <section
      data-task-comments-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-2">
        <MessageSquarePlus className="h-5 w-5 text-[#CBB5FF]" />
        <h2 className="text-lg font-semibold text-white">Add a comment</h2>
      </div>

      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write an update, clarification, or execution note"
        className="min-h-[140px] rounded-2xl border-white/10 bg-[#0C111D] text-white placeholder:text-[#667085]"
      />

      {submitError ? (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        <AppSubmitButton
          type="button"
          isSubmitting={isPending}
          onClick={handleSubmit}
          disabled={!body.trim()}
          className="w-auto px-6"
        >
          Add Comment
        </AppSubmitButton>
      </div>
    </section>
  );
};

export default TaskCommentComposer;
