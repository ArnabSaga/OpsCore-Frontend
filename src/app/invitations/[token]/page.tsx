import InvitationResponsePageContent from "@/components/features/workspace/components/InvitationResponsePageContent";

type Props = {
  params: Promise<{ token: string }>;
};

const InvitationPage = async ({ params }: Props) => {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-[#0C111D]">
       <InvitationResponsePageContent token={token} />
    </div>
  );
};

export default InvitationPage;
