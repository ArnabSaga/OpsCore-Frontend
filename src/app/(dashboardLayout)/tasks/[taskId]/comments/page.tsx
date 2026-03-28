import TaskCommentsPageContent from "@/components/features/task/components/TaskCommentsPageContent";

type TaskCommentsPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskCommentsPage({ params }: TaskCommentsPageProps) {
  const { taskId } = await params;

  return <TaskCommentsPageContent taskId={taskId} />;
}
