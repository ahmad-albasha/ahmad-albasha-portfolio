"use client";

import { ArrowDown, CalendarDays } from "lucide-react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { stepNumber } from "@/lib/i18n";
import { ContactForm, type Lead } from "./ContactForm";

function CalendarLoading() {
  const t = useTranslations("book");
  return (
    <div className="grid h-full place-items-center p-8 text-center text-sm">
      <CalendarDays aria-hidden className="mx-auto size-6 animate-pulse text-gold" />
      <span className="sr-only">{t("calendarLoading")}</span>
    </div>
  );
}

const CalEmbed = dynamic(() => import("./CalEmbed"), { ssr: false, loading: CalendarLoading });

/** Numbered step heading shared by both panels, so the order (details first, then a time) reads at a glance. */
function StepHeading({ id, step, title, note }: { id: string; step: number; title: string; note?: string }) {
  const locale = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 font-mono text-sm text-gold rtl:font-sans">
        {stepNumber(step - 1, locale)}
      </span>
      <h2 id={id} className="text-title">
        {title}
      </h2>
      {note && <span className="ms-auto rounded-full border border-line px-3 py-1 text-label text-muted">{note}</span>}
    </div>
  );
}

/**
 * Two steps: an optional qualification form, then the scheduler. Submitting the form
 * pre-fills the booking; visitors who'd rather not can skip straight to the calendar.
 * Without a Cal.com link, the second step becomes a compact "message me instead" panel.
 */
export function BookingPanel({ calLink, contactFallback }: { calLink: string; contactFallback: ReactNode }) {
  const t = useTranslations("book");
  const form = useTranslations("form");
  const [lead, setLead] = useState<Lead | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
      <section aria-labelledby="qualify-title" className="rounded-card border border-line bg-surface p-6 md:p-9">
        <StepHeading id="qualify-title" step={1} title={form("title")} note={t("optional")} />
        <p className="mt-3 mb-8 text-sm">{form("intro")}</p>
        <ContactForm onSuccess={setLead} />
        {lead && calLink && <p className="mt-4 text-sm text-gold-soft">{t("prefilled")}</p>}
        {calLink && !lead && (
          <a href="#calendar" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-fg transition-colors hover:text-gold lg:hidden">
            {t("skipToCalendar")}
            <ArrowDown aria-hidden className="size-4" />
          </a>
        )}
      </section>

      <section
        aria-labelledby="calendar-title"
        id="calendar"
        className={cn("scroll-mt-24 overflow-hidden rounded-card border border-line bg-surface", calLink && "lg:sticky lg:top-24")}
      >
        <div className="border-b border-line p-6 md:px-9">
          <StepHeading id="calendar-title" step={2} title={t("calendarTitle")} />
        </div>
        {calLink ? (
          <div className="h-[40rem]">
            <CalEmbed key={lead?.email ?? "anonymous"} calLink={calLink} name={lead?.name} email={lead?.email} notes={lead?.message} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 p-8 text-center text-sm md:p-12">
            <CalendarDays aria-hidden className="size-6 text-gold" />
            <p className="max-w-sm">{t("notConfigured")}</p>
            {contactFallback}
          </div>
        )}
      </section>
    </div>
  );
}
