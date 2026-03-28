import EditProjectPageContent from "@/components/features/project/components/EditProjectPageContent";

type EditProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectId } = await params;

  return <EditProjectPageContent projectId={projectId} />;
}
