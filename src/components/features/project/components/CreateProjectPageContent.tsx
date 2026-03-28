"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ProjectForm, {
  ProjectFormSubmitPayload,
} from "@/components/features/project/components/ProjectForm";
import ProjectFormHeader from "@/components/features/project/components/ProjectFormHeader";
import { useCreateProject } from "@/components/features/project/hooks/useCreateProject";
import type { CreateProjectPayload } from "@/types/project.types";

const CreateProjectPageContent = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: createProject, isPending } = useCreateProject();
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-project-form-hero]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-project-form-card]",
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCreateProject = async (payload: ProjectFormSubmitPayload) => {
    setSubmitError(null);

    try {
      const createdProject = await createProject(payload as CreateProjectPayload);
      router.replace(`/projects/${createdProject.id}`);
      router.refresh();
      return createdProject;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to create project. Please try again.");
      }
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <ProjectFormHeader mode="create" />

      <ProjectForm
        mode="create"
        isSubmitting={isPending}
        submitError={submitError}
        submitLabel="Create Project"
        cancelHref="/projects"
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default CreateProjectPageContent;
