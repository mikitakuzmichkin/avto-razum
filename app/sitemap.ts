import type { MetadataRoute } from "next";
import { brands } from "@/content/brands";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/uslugi",
    "/raboty",
    "/kontakty",
    "/marki",
    ...services.map((service) => `/uslugi/${service.slug}`),
    ...brands.map((brand) => `/marki/${brand.slug}`),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/uslugi/") ? 0.8 : 0.7,
  }));
}
