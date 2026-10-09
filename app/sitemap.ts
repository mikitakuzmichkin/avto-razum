import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/uslugi",
    "/raboty",
    "/kontakty",
    ...services.map((service) => `/uslugi/${service.slug}`),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/uslugi/") ? 0.8 : 0.7,
  }));
}
