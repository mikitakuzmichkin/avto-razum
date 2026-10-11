import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/avto-razum") : "";

const nextConfig: NextConfig = {
  output: pages ? "export" : "standalone",
  ...(pages
    ? {
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
