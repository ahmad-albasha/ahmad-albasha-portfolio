"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const NAMESPACE = "discovery-call";

/** Inline Cal.com scheduler styled to match the site. Loaded client-side only (see BookingPanel). */
export default function CalEmbed({ calLink, name, email, notes }: { calLink: string; name?: string; email?: string; notes?: string }) {
  useEffect(() => {
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { dark: { "cal-brand": "#C9A96E" }, light: { "cal-brand": "#C9A96E" } },
      });
    });
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={calLink}
      className="h-full w-full overflow-auto"
      config={{
        layout: "month_view",
        theme: "dark",
        ...(name && { name }),
        ...(email && { email }),
        ...(notes && { notes }),
      }}
    />
  );
}
