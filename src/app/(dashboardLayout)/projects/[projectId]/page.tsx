import ProjectDetailsPageContent from "@/components/features/project/components/ProjectDetailsPageContent";

type ProjectDetailsPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { projectId } = await params;

  return <ProjectDetailsPageContent projectId={projectId} />;
}
