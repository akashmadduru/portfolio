"use client";

import * as React from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <TooltipProvider delayDuration={150}>
        {children}
        <Toaster />
      </TooltipProvider>
    </SmoothScroll>
  );
}
