import { readFileSync, writeFileSync } from "node:fs";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const pages = process.env.GITHUB_PAGES === "1";

function slugs(file, pattern) {
  return [...readFileSync(file, "utf8").matchAll(pattern)].map((match) => match[1]);
}

const serviceSlugs = slugs(new URL("../content/services.ts", import.meta.url), /slug:\s*"([^"]+)"/g);
const brandSlugs = [
  ...slugs(new URL("../content/brands.ts", import.meta.url), /slug:\s*"([^"]+)"/g),
  ...slugs(new URL("../content/brands.ts", import.meta.url), /chineseBrand\(\s*"([^"]+)"/g),
];

function absoluteUrl(path, trailingSlash = false) {
  const url = new URL(path === "/" ? "" : path.replace(/^\//, ""), `${siteUrl}/`);
  if (trailingSlash && path !== "/" && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }
  return url.toString();
}

const paths = [
  "/",
  "/uslugi",
  "/raboty",
  "/kontakty",
  "/marki",
  ...serviceSlugs.map((slug) => `/uslugi/${slug}`),
  ...brandSlugs.map((slug) => `/marki/${slug}`),
];

const updated = new Date().toISOString();
const urls = paths
  .map((path) => {
    const frequency = path === "/" ? "weekly" : "monthly";
    const priority = path === "/" ? "1" : path.startsWith("/uslugi/") ? "0.8" : "0.7";
    return [
      "  <url>",
      `    <loc>${absoluteUrl(path, pages)}</loc>`,
      `    <lastmod>${updated}</lastmod>`,
      `    <changefreq>${frequency}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

writeFileSync(
  "public/robots.txt",
  ["User-Agent: *", "Allow: /", "Disallow: /api/", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n"),
);

writeFileSync(
  "public/sitemap.xml",
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n"),
);
