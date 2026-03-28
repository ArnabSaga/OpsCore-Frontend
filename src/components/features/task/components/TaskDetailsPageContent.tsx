"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import TaskAccessNotice from "@/components/features/task/components/TaskAccessNotice";
import TaskActivityCard from "@/components/features/task/components/TaskActivityCard";
import TaskAttachmentsPreview from "@/components/features/task/components/TaskAttachmentsPreview";
import TaskCommentsPreview from "@/components/features/task/components/TaskCommentsPreview";
import TaskDetailsHero from "@/components/features/task/components/TaskDetailsHero";
import TaskDetailsSkeleton from "@/components/features/task/components/TaskDetailsSkeleton";
import TaskMetadataCard from "@/components/features/task/components/TaskMetadataCard";
import TaskSummaryCard from "@/components/features/task/components/TaskSummaryCard";
import { useTaskAttachments } from "@/components/features/task/hooks/useTaskAttachments";
import { useTaskComments } from "@/components/features/task/hooks/useTaskComments";
import { useTaskDetails } from "@/components/features/task/hooks/useTaskDetails";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

type TaskDetailsPageContentProps = {
  taskId: string;
};

const TaskDetailsPageContent = ({ taskId }: TaskDetailsPageContentProps) => {
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
  } = useTaskComments({
    taskId,
    params: { page: 1, limit: 3 },
    enabled: !!taskId,
  });

  const {
    data: attachmentsResponse,
    isLoading: isAttachmentsLoading,
    isError: isAttachmentsError,
    refetch: refetchAttachments,
  } = useTaskAttachments({
    taskId,
    params: { page: 1, limit: 3 },
    enabled: !!taskId,
  });

  const isLoading = isTaskLoading || isCommentsLoading || isAttachmentsLoading;
  const isError = isTaskError || isCommentsError || isAttachmentsError;

  useEffect(() => {
    if (!containerRef.current || isLoading || !task) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-task-page-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-task-page-card]",
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
  }, [isLoading, task]);

  if (isLoading) {
    return <TaskDetailsSkeleton />;
  }

  if (isError || !task) {
    return (
      <ProtectedPageErrorState
        title="Unable to load task overview"
        description="We couldn't load the task details, recent comments, or recent attachments."
        onRetry={() => {
          void refetchTask();
          void refetchComments();
          void refetchAttachments();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <TaskDetailsHero task={task} />

      <TaskSummaryCard task={task} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="space-y-6">
          <div data-task-page-card>
            <TaskMetadataCard task={task} />
          </div>

          <div data-task-page-card>
            <TaskActivityCard task={task} />
          </div>
        </div>

        <div className="space-y-6">
          <div data-task-page-card>
            <TaskAccessNotice />
          </div>

          <div data-task-page-card>
            <TaskCommentsPreview taskId={taskId} comments={commentsResponse?.data ?? []} />
          </div>

          <div data-task-page-card>
            <TaskAttachmentsPreview taskId={taskId} attachments={attachmentsResponse?.data ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPageContent;
