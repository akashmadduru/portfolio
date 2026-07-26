"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { contact, socials } from "@/lib/data/socials";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Tell me a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const details = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: MapPin, label: "Location", value: contact.location, href: undefined },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const openMailto = (values: FormValues) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        fallback?: boolean;
      };

      if (res.ok && data.ok) {
        toast.success("Message sent!", {
          description: "Check your inbox for a confirmation — I'll reply properly soon.",
        });
        reset();
        return;
      }

      // Email not configured (or transient failure) → mailto fallback.
      toast("Opening your email client…", {
        description: "Finishing up in your mail app.",
      });
      openMailto(values);
    } catch {
      toast("Opening your email client…", {
        description: "Finishing up in your mail app.",
      });
      openMailto(values);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.04]";

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="panel relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/20 blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-aurora-3/20 blur-[110px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title={
                  <>
                    Let&apos;s build something <span className="text-gradient">exceptional.</span>
                  </>
                }
                description="Have a role, a project, or an idea worth chasing? My inbox is always open."
              />

              <div className="mt-10 space-y-3">
                {details.map((d) => {
                  const Icon = d.icon;
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-[0.14em] text-foreground/40">
                          {d.label}
                        </div>
                        <div className="text-sm font-medium text-foreground/85">{d.value}</div>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={d.label}>
                      {d.href ? (
                        <a href={d.href} className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Reveal>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-foreground"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <Reveal direction="left">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
                noValidate
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      className={cn(fieldClass, errors.name && "border-destructive/60")}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      aria-invalid={!!errors.email}
                      className={cn(fieldClass, errors.email && "border-destructive/60")}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about the role or project…"
                      aria-invalid={!!errors.message}
                      className={cn(fieldClass, "resize-none", errors.message && "border-destructive/60")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="aurora"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
