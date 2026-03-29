import { Mail, User2 } from "lucide-react";

import type { ActivityLogActor } from "@/components/features/activity-log/types/activity-log.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type ActivityLogActorCardProps = {
  actor: ActivityLogActor;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ActivityLogActorCard = ({ actor }: ActivityLogActorCardProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/85 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white">Actor</h3>

        <div className="mt-5 flex items-start gap-4">
          <Avatar className="h-14 w-14 border border-white/10">
            <AvatarImage src={actor.image ?? undefined} alt={actor.name} />
            <AvatarFallback className="bg-[#7F56D9]/15 text-[#CBB5FF]">
              {getInitials(actor.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-white">
              <User2 className="h-4 w-4 text-[#CBB5FF]" />
              <span className="font-medium">{actor.name}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Mail className="h-4 w-4 text-[#CBB5FF]" />
              <span className="break-all">{actor.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogActorCard;
