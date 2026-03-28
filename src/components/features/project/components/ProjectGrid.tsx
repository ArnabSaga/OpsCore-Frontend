import { cn } from "@/lib/utils";
import type { ProjectListItem } from "@/types/project.types";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: ProjectListItem[];
};

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-5",
        projects.length === 1 ? "mx-auto max-w-xl" : "xl:grid-cols-2 2xl:grid-cols-3"
      )}
    >
      {projects.map((project) => (
        <div key={project.id} data-project-card>
          <ProjectCard project={project} />
        </div>
      ))}
    </section>
  );
};

export default ProjectGrid;
