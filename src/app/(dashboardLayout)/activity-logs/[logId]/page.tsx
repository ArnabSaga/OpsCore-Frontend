import ActivityLogDetailsPageContent from "@/components/features/activity-log/components/ActivityLogDetailsPageContent";

type Props = {
  params: Promise<{ logId: string }>;
};

export default async function ActivityLogDetailsPage({ params }: Props) {
  const { logId } = await params;
  return <ActivityLogDetailsPageContent logId={logId} />;
}
