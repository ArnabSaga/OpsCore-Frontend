import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type PlatformDataTableCardProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function PlatformDataTableCard({
  title,
  icon: Icon,
  children,
}: PlatformDataTableCardProps) {
  return (
    <Card className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="h-5 w-5 text-[#CBB5FF]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
