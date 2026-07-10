"use client";

import { RotateCw } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[100svh] place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-primary">Something broke</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          An unexpected error occurred
        </h1>
        <p className="mt-3 text-muted-foreground">
          Sorry about that. You can try again — if it keeps happening, please reach out.
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={reset} variant="aurora" size="lg">
            <RotateCw className="size-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
