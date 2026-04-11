import InvitationResponsePageContent from "@/components/features/invitations/components/InvitationResponsePageContent";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function InvitationTokenPage({ params }: Props) {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-[#0C111D]">
      <InvitationResponsePageContent token={token} />
    </div>
  );
}
