import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, the /og image, Next internals and files with an extension (robots.txt, sitemap.xml…)
  matcher: "/((?!api|og|_next|_vercel|.*\\..*).*)",
};
