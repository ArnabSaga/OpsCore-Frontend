import TaskDetailsPageContent from "@/components/features/task/components/TaskDetailsPageContent";

type TaskDetailsPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskDetailsPage({ params }: TaskDetailsPageProps) {
  const { taskId } = await params;

  return <TaskDetailsPageContent taskId={taskId} />;
}
