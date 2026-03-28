import { AlertTriangle, CheckCircle2, Clock3, Layers3 } from "lucide-react";

import ProjectMetricCard from "@/components/features/project/components/ProjectMetricCard";
import type { ProjectSummary } from "@/types/project.types";

type ProjectSummaryCardsProps = {
  summary: ProjectSummary;
};

const ProjectSummaryCards = ({ summary }: ProjectSummaryCardsProps) => {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div data-project-card>
        <ProjectMetricCard
          label="Total tasks"
          value={summary.totalTasks}
          icon={<Layers3 className="h-5 w-5" />}
          tone="default"
          helperText="Fetched from project summary"
        />
      </div>

      <div data-project-card>
        <ProjectMetricCard
          label="Completed"
          value={summary.completedTasks}
          icon={<CheckCircle2 className="h-5 w-5" />}
          tone="success"
          helperText={`${summary.completionRate}% completion`}
        />
      </div>

      <div data-project-card>
        <ProjectMetricCard
          label="Open tasks"
          value={summary.openTasks}
          icon={<Clock3 className="h-5 w-5" />}
          tone="primary"
          helperText="Still in progress or pending"
        />
      </div>

      <div data-project-card>
        <ProjectMetricCard
          label="Overdue"
          value={summary.overdueTasks}
          icon={<AlertTriangle className="h-5 w-5" />}
          tone="warning"
          helperText="Needs immediate follow-up"
        />
      </div>
    </section>
  );
};

export default ProjectSummaryCards;
