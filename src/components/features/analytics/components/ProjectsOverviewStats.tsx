import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import AnalyticsStatCard from "@/components/features/analytics/components/AnalyticsStatCard";
import type { ProjectsAnalyticsData } from "@/components/features/analytics/types/analytics.types";

type ProjectsOverviewStatsProps = {
  data: ProjectsAnalyticsData;
};

const ProjectsOverviewStats = ({ data }: ProjectsOverviewStatsProps) => {
  const { projects, tasks } = data.summary;

  return (
    <AnalyticsSectionCard
      title="Workspace summary"
      description="Project lifecycle and task execution overview."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard label="Completed" value={projects.completed} />
        <AnalyticsStatCard label="On hold" value={projects.onHold} />
        <AnalyticsStatCard label="Overdue tasks" value={tasks.overdue} />
        <AnalyticsStatCard label="Completion rate" value={`${tasks.completionRate.toFixed(1)}%`} />
      </div>
    </AnalyticsSectionCard>
  );
};

export default ProjectsOverviewStats;
