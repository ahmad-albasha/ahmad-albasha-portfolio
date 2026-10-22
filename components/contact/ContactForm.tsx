"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { budgetRanges, contactFields, MESSAGE_MIN_LENGTH, projectTypes, type ContactField } from "@/lib/contact";
import { cn } from "@/lib/cn";

export type Lead = Record<ContactField, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(lead: Lead): ContactField[] {
  const errors: ContactField[] = [];
  if (!lead.name.trim()) errors.push("name");
  if (!EMAIL_PATTERN.test(lead.email)) errors.push("email");
  if (!lead.projectType) errors.push("projectType");
  if (!lead.budget) errors.push("budget");
  if (lead.message.trim().length < MESSAGE_MIN_LENGTH) errors.push("message");
  return errors;
}

const inputClasses =
  "min-h-12 w-full rounded-control border border-line bg-surface px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 hover:border-line-strong focus:border-gold focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-gold/25 aria-[invalid=true]:border-red-400/70";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-fg/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

/** Qualification / contact form. Posts to /api/contact; motion-free by design. */
export function ContactForm({ onSuccess }: { onSuccess?: (lead: Lead) => void }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ContactField[]>([]);

  const id = (field: ContactField) => `${uid}-${field}`;
  const fieldProps = (field: ContactField) => {
    const invalid = errors.includes(field);
    return {
      id: id(field),
      name: field,
      "aria-invalid": invalid,
      "aria-describedby": invalid ? `${id(field)}-error` : undefined,
    };
  };
  const errorFor = (field: ContactField) => (errors.includes(field) ? t(`errors.${field}`) : undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lead = Object.fromEntries(contactFields.map((f) => [f, String(data.get(f) ?? "")])) as Lead;

    const invalid = validate(lead);
    setErrors(invalid);
    if (invalid.length > 0) {
      form.querySelector<HTMLElement>(`#${CSS.escape(id(invalid[0]))}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, locale, company: String(data.get("company") ?? "") }),
      });
      const json = (await res.json()) as { ok: boolean; fields?: ContactField[] };
      if (res.status === 422 && json.fields) {
        setErrors(json.fields.filter((f) => contactFields.includes(f)));
        setStatus("idle");
        return;
      }
      if (!json.ok) throw new Error();
      setStatus("success");
      form.reset();
      onSuccess?.(lead);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-card border border-gold/40 bg-gold/[0.05] p-6">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-ink">
          <Check className="size-4" aria-hidden />
        </span>
        <p className="text-fg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label={t("name")} error={errorFor("name")}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClasses} />
        </Field>
        <Field id={id("email")} label={t("email")} error={errorFor("email")}>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" dir="ltr" required className={cn(inputClasses, "rtl:text-right")} />
        </Field>
        <Field id={id("projectType")} label={t("projectType")} error={errorFor("projectType")}>
          <select {...fieldProps("projectType")} required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              {t("select")}
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {t(`projectTypes.${type}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("budget")} label={t("budget")} error={errorFor("budget")}>
          <select {...fieldProps("budget")} required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              {t("select")}
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {t(`budgets.${range}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={id("message")} label={t("message")} error={errorFor("message")}>
        <textarea {...fieldProps("message")} rows={5} required placeholder={t("messagePlaceholder")} className={cn(inputClasses, "resize-y")} />
      </Field>

      {/* Honeypot — hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden className="sr-only">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{t("privacy")}</p>
        <button type="submit" disabled={status === "sending"} className={buttonClasses({ size: "lg" })}>
          {status === "sending" && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
      <p role="alert" className="text-sm text-red-300 empty:hidden">
        {status === "error" ? t("error") : ""}
      </p>
    </form>
  );
}
