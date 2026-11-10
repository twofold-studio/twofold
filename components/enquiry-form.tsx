"use client";
import { useI18n } from "./i18n-provider";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "invalid" | "fallback" | "error";

/**
 * Posts to /api/enquiry (server/enquiry.mjs). When the server has no delivery
 * address configured, it opens the visitor's email app with the message filled in.
 */
export function EnquiryForm() {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  const openEmail = (data: Record<string, string>) => {
    const signature = [data.name, data.company].filter(Boolean).join(", ");
    const body = `${data.message ?? ""}\n\n${signature}\n${data.email ?? ""}`;
    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(body)}`;
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [key, typeof value === "string" ? value : ""]),
    );
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (response.ok) {
        form.reset();
        setStatus("sent");
      } else if (response.status === 400) {
        setStatus("invalid");
      } else if ([404, 405, 503].includes(response.status)) {
        openEmail(data);
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const messages: Partial<Record<Status, string>> = {
    sent: t.formSent,
    invalid: t.formInvalid,
    fallback: t.formFallback,
  };
  const label = "flex flex-col gap-2 text-small font-medium text-foreground";

  return (
    <form onSubmit={submit} aria-describedby="enquiry-privacy" className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {t.formName}
          <input name="name" required maxLength={120} autoComplete="name" className="field" />
        </label>
        <label className={label}>
          {t.formEmail}
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="field"
          />
        </label>
      </div>
      <label className={label}>
        {t.formCompany}
        <input name="company" maxLength={160} autoComplete="organization" className="field" />
      </label>
      <label className={label}>
        {t.formMessage}
        <textarea name="message" required rows={5} maxLength={5000} className="field resize-y" />
      </label>
      {/* Left empty by people; bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p id="enquiry-privacy" className="text-small text-muted-foreground">
        {t.formPrivacy}
      </p>
      <div>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary">
          {status === "sending" ? t.formSending : t.formSubmit}
        </button>
      </div>
      <output aria-live="polite" className="block min-h-[1.65em] text-body text-foreground">
        {status === "error" ? (
          <>
            {t.formError}{" "}
            <a href={`mailto:${studio.email}`} className="link focus-ring">
              {studio.email}
            </a>
            .
          </>
        ) : (
          messages[status]
        )}
      </output>
    </form>
  );
}
