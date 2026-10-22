import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

// next-intl reads its request config through the "next-intl/config" alias. We register the alias
// directly rather than via `next-intl/plugin`, which eagerly loads @swc/core's native binary
// (only needed for next-intl's optional message extraction) and fails on some Windows setups.
const intlRequestConfig = "./i18n/request.ts";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  turbopack: {
    resolveAlias: { "next-intl/config": intlRequestConfig },
  },
  webpack(config) {
    config.resolve.alias["next-intl/config"] = path.resolve(intlRequestConfig);
    return config;
  },
};

export default withMDX(nextConfig);
