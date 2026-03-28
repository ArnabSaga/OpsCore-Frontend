import TaskAttachmentsPageContent from "@/components/features/task/components/TaskAttachmentsPageContent";

type TaskAttachmentsPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskAttachmentsPage({ params }: TaskAttachmentsPageProps) {
  const { taskId } = await params;

  return <TaskAttachmentsPageContent taskId={taskId} />;
}
