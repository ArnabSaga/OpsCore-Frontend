"use client";

import { useState } from "react";

export const useNotificationPanelState = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    openPanel: () => setOpen(true),
    closePanel: () => setOpen(false),
    togglePanel: () => setOpen((prev) => !prev),
  };
};
