"use client";

import { useContext } from "react";
import { WorkspaceContext } from "@/providers/WorkspaceProvider";

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspaceContext must be used within WorkspaceProvider");
  }

  return context;
};
