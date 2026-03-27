"use client";

import { ReactNode } from "react";
import WorkspaceSettingsSidebar from "./WorkspaceSettingsSidebar";

type WorkspaceSettingsShellProps = {
  hero: ReactNode;
  children: ReactNode;
};

const WorkspaceSettingsShell = ({ hero, children }: WorkspaceSettingsShellProps) => {
  return (
    <div className="space-y-6">
      {hero}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <WorkspaceSettingsSidebar />
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default WorkspaceSettingsShell;
