"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!bg-card/90 !border-white/10 !text-foreground !backdrop-blur-xl !rounded-xl",
          description: "!text-muted-foreground",
        },
      }}
    />
  );
}
