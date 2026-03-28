import ProjectTasksPageContent from "@/components/features/project/components/ProjectTasksPageContent";

type ProjectTasksPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const { projectId } = await params;

  return <ProjectTasksPageContent projectId={projectId} />;
}
