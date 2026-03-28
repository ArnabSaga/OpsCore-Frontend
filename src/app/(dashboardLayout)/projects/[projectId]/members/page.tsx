import ProjectMembersPageContent from "@/components/features/project/components/ProjectMembersPageContent";

type ProjectMembersPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectMembersPage({ params }: ProjectMembersPageProps) {
  const { projectId } = await params;

  return <ProjectMembersPageContent projectId={projectId} />;
}
