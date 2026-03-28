"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import ProjectDetailsSkeleton from "@/components/features/project/components/ProjectDetailsSkeleton";
import ProjectForm, {
  ProjectFormSubmitPayload,
} from "@/components/features/project/components/ProjectForm";
import ProjectFormHeader from "@/components/features/project/components/ProjectFormHeader";
import { useProjectDetails } from "@/components/features/project/hooks/useProjectDetails";
import { useUpdateProject } from "@/components/features/project/hooks/useUpdateProject";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import type { UpdateProjectPayload } from "@/types/project.types";

type EditProjectPageContentProps = {
  projectId: string;
};

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const EditProjectPageContent = ({ projectId }: EditProjectPageContentProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: project, isLoading, isError, refetch } = useProjectDetails({ projectId });
  const { mutateAsync: updateProject, isPending } = useUpdateProject();

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-form-hero]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-project-form-card]",
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.08, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const initialValues = useMemo(() => {
    if (!project) return undefined;

    return {
      name: project.name,
      description: project.description ?? "",
      clientName: project.clientName ?? "",
      status: project.status,
      startDate: toDateInputValue(project.startDate),
      endDate: toDateInputValue(project.endDate),
    };
  }, [project]);

  const handleUpdateProject = async (payload: ProjectFormSubmitPayload) => {
    setSubmitError(null);

    try {
      const updatedProject = await updateProject({
        projectId,
        payload: payload as UpdateProjectPayload,
      });

      router.replace(`/projects/${updatedProject.id}`);
      router.refresh();
      return updatedProject;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to update project. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (isError || !project) {
    return (
      <ProtectedPageErrorState
        title="Unable to load project"
        description="We couldn't load the project details needed for editing."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectFormHeader mode="edit" />

      <ProjectForm
        mode="edit"
        initialValues={initialValues}
        isSubmitting={isPending}
        submitError={submitError}
        submitLabel="Save Changes"
        cancelHref={`/projects/${projectId}`}
        onSubmit={handleUpdateProject}
      />
    </div>
  );
};

export default EditProjectPageContent;
