import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import TopProjectCard from "@/components/features/analytics/components/TopProjectCard";
import type { TopProjectAnalyticsItem } from "@/components/features/analytics/types/analytics.types";

type TopProjectsTableProps = {
  projects: TopProjectAnalyticsItem[];
};

const TopProjectsTable = ({ projects }: TopProjectsTableProps) => {
  return (
    <AnalyticsSectionCard
      title="Top recent projects"
      description="Recently active projects with task completion context."
    >
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8]">
          No project rows available for this date range.
        </div>
      ) : (
        <>
          <div className="hidden xl:block overflow-x-auto">
            <table className="min-w-full text-left text-sm text-[#94A3B8]">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
                <tr>
                  <th className="px-5 py-4">Project</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Members</th>
                  <th className="px-5 py-4">Tasks</th>
                  <th className="px-5 py-4">Done</th>
                  <th className="px-5 py-4">Overdue</th>
                  <th className="px-5 py-4">Completion</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.projectId} className="border-t border-white/10">
                    <td className="px-5 py-4 font-medium text-white">{project.name}</td>
                    <td className="px-5 py-4">{project.status}</td>
                    <td className="px-5 py-4">{project.membersCount}</td>
                    <td className="px-5 py-4">{project.tasks.total}</td>
                    <td className="px-5 py-4">{project.tasks.done}</td>
                    <td className="px-5 py-4">{project.tasks.overdue}</td>
                    <td className="px-5 py-4 text-white">
                      {project.tasks.completionRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 xl:hidden">
            {projects.map((project) => (
              <TopProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </>
      )}
    </AnalyticsSectionCard>
  );
};

export default TopProjectsTable;
