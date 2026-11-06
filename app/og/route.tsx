import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { ogImage } from "@/lib/seo";

export const dynamic = "force-static";

// Social preview shared by every page (referenced from lib/seo.ts).
// Text stays in English: the OG renderer has no Arabic text shaping.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(ellipse 60% 70% at 85% 10%, rgba(201,169,110,0.25), transparent 70%), #100f0d",
          color: "#e8e1d5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              border: "2px solid rgba(201,169,110,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c9a96e",
              fontSize: 30,
            }}
          >
            AA
          </div>
          <div style={{ fontSize: 28, color: "#ada597", letterSpacing: 4, textTransform: "uppercase" }}>{site.role.en}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, lineHeight: 1.05, letterSpacing: -2 }}>{site.name.en}</div>
          <div style={{ fontSize: 36, color: "#c9a96e" }}>AI systems, websites & mobile apps — from idea to launch.</div>
        </div>
        <div style={{ display: "flex", height: 2, background: "linear-gradient(90deg, rgba(201,169,110,0.7), transparent)" }} />
      </div>
    ),
    { width: ogImage.width, height: ogImage.height },
  );
}
