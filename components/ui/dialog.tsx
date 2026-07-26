"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

import { cn } from "@/lib/utils";

/**
 * Lenis intercepts wheel/touch scroll globally, so its virtual page-scroll
 * keeps moving underneath an open dialog even when Radix's own body-scroll
 * lock is in effect. Pausing Lenis while open (and resuming on close/unmount)
 * stops the page from scrolling — but Lenis's wheel handler calls
 * `preventDefault()` unconditionally while stopped, which would also block
 * the dialog's own scroll. `DialogContent` below carries `data-lenis-prevent`
 * so Lenis skips it entirely and native `overflow-y-auto` scroll works there
 * regardless of the stopped state.
 */
function Dialog({
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const lenis = useLenis();

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
      onOpenChange?.(open);
    },
    [lenis, onOpenChange],
  );

  React.useEffect(() => {
    return () => {
      // Safety net: don't leave page scroll stuck off if this instance
      // unmounts (e.g. route change) while still open.
      lenis?.start();
    };
  }, [lenis]);

  return <DialogPrimitive.Root onOpenChange={handleOpenChange} {...props} />;
}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-md dialog-overlay-anim",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-lenis-prevent
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2",
          "max-h-[88vh] overflow-y-auto rounded-2xl border border-white/12 bg-card/85 p-0 shadow-2xl backdrop-blur-2xl",
          "dialog-content-anim",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/10 bg-black/30 text-foreground/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label="Close"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-2xl font-semibold leading-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
