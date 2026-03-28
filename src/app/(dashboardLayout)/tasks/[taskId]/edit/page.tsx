import EditTaskPageContent from "@/components/features/task/components/EditTaskPageContent";

type EditTaskPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { taskId } = await params;

  return <EditTaskPageContent taskId={taskId} />;
}
