"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import TaskAttachmentsEmptyState from "@/components/features/task/components/TaskAttachmentsEmptyState";
import TaskAttachmentsHeader from "@/components/features/task/components/TaskAttachmentsHeader";
import TaskAttachmentsList from "@/components/features/task/components/TaskAttachmentsList";
import TaskAttachmentsSkeleton from "@/components/features/task/components/TaskAttachmentsSkeleton";
import TaskUploadPanel from "@/components/features/task/components/TaskUploadPanel";
import { useTaskAttachments } from "@/components/features/task/hooks/useTaskAttachments";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

type TaskAttachmentsPageContentProps = {
  taskId: string;
};

const TaskAttachmentsPageContent = ({ taskId }: TaskAttachmentsPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
    refetch: refetchTask,
  } = useTaskDetails({ taskId });

  const {
    data: attachmentsResponse,
    isLoading: isAttachmentsLoading,
    isError: isAttachmentsError,
    refetch: refetchAttachments,
    isFetching,
  } = useTaskAttachments({
    taskId,
    params: {
      page: 1,
      limit: 50,
    },
    enabled: !!taskId,
  });

  const isLoading = isTaskLoading || isAttachmentsLoading;
  const isError = isTaskError || isAttachmentsError;
  const attachments = attachmentsResponse?.data ?? [];
  const meta = attachmentsResponse?.meta;

  useEffect(() => {
    if (!containerRef.current || isLoading || !task) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-attachments-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-attachments-card]",
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
  }, [isLoading, task, attachments.length]);

  if (isLoading) {
    return <TaskAttachmentsSkeleton />;
  }

  if (isError || !task) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task attachments"
        description="We couldn't load the task details or attachment list."
        onRetry={() => {
          void refetchTask();
          void refetchAttachments();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskAttachmentsHeader task={task} />

      <TaskUploadPanel taskId={taskId} />

      {attachments.length === 0 ? (
        <div data-task-attachments-card>
          <TaskAttachmentsEmptyState />
        </div>
      ) : (
        <>
          <TaskAttachmentsList taskId={taskId} attachments={attachments} />

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#94A3B8]">
              {typeof meta?.total === "number" ? (
                <>
                  <span className="font-semibold text-white">{meta.total}</span> attachments total
                </>
              ) : (
                <>
                  <span className="font-semibold text-white">{attachments.length}</span> attachments
                  loaded
                </>
              )}
              {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void refetchAttachments();
              }}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Refresh Files
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskAttachmentsPageContent;
