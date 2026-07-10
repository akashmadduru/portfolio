import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-[100svh] place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="aurora" size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
