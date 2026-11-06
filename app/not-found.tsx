import Link from "next/link";

// Fallback for requests that never reach a locale (the proxy normally redirects them).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body style={{ background: "#100f0d", color: "#e8e1d5", fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: 500 }}>Page not found</h1>
          <Link href="/" style={{ color: "#c9a96e" }}>
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
