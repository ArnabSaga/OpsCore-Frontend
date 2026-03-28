"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import TaskCommentComposer from "@/components/features/task/components/TaskCommentComposer";
import TaskCommentsEmptyState from "@/components/features/task/components/TaskCommentsEmptyState";
import TaskCommentsHeader from "@/components/features/task/components/TaskCommentsHeader";
import TaskCommentsList from "@/components/features/task/components/TaskCommentsList";
import TaskCommentsSkeleton from "@/components/features/task/components/TaskCommentsSkeleton";
import { useTaskComments } from "@/components/features/task/hooks/useTaskComments";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

type TaskCommentsPageContentProps = {
  taskId: string;
};

const TaskCommentsPageContent = ({ taskId }: TaskCommentsPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
    refetch: refetchTask,
  } = useTaskDetails({ taskId });

  const {
    data: commentsResponse,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
    isFetching,
  } = useTaskComments({
    taskId,
    params: {
      page: 1,
      limit: 50,
    },
    enabled: !!taskId,
  });

  const isLoading = isTaskLoading || isCommentsLoading;
  const isError = isTaskError || isCommentsError;
  const comments = commentsResponse?.data ?? [];
  const meta = commentsResponse?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading || !task) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-comments-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-comments-card]",
        { opacity: 0, y: 20, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.06,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, task, comments.length]);

  if (isLoading) {
    return <TaskCommentsSkeleton />;
  }

  if (isError || !task) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task comments"
        description="We couldn't load the task details or comment thread."
        onRetry={() => {
          void refetchTask();
          void refetchComments();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskCommentsHeader task={task} />

      <TaskCommentComposer taskId={taskId} />

      {comments.length === 0 ? (
        <div data-task-comments-card>
          <TaskCommentsEmptyState />
        </div>
      ) : (
        <>
          <TaskCommentsList taskId={taskId} comments={comments} />

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#94A3B8]">
              {typeof meta?.total === "number" ? (
                <>
                  <span className="font-semibold text-white">{meta.total}</span> comments total
                </>
              ) : (
                <>
                  <span className="font-semibold text-white">{comments.length}</span> comments
                  loaded
                </>
              )}
              {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void refetchComments();
              }}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Refresh Thread
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCommentsPageContent;
