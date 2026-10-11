import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path: string) {
  const base = site.url.endsWith("/") ? site.url : `${site.url}/`;
  const relative = path === "/" ? "" : path.replace(/^\//, "");
  return new URL(relative, base).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/services/antikor.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ru: url },
    },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      locale: "ru_BY",
      type: "website",
      siteName: site.name,
      images: [{ url: image, alt: title }],
    },
  };
}
