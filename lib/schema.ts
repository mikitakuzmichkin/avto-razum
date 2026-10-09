import { faq } from "@/content/faq";
import { services, type Service } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/** Review и AggregateRating намеренно не отдаём: отзывы в шаблоне черновые. */

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    taxID: site.unp,
    description: site.description,
    url: site.url,
    image: absoluteUrl("/brand/logo.svg"),
    inLanguage: "ru-BY",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.addressRegion,
      addressCountry: site.countryCode,
      ...(site.addressIsPlaceholder
        ? {}
        : { streetAddress: site.streetAddress }),
    },
    areaServed: {
      "@type": "City",
      name: site.city,
    },
    ...(site.phoneIsPlaceholder ? {} : { telephone: site.phone }),
    sameAs: [site.instagram, site.mapUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги AVTO RAZUM",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.seoTitle,
          url: absoluteUrl(`/uslugi/${service.slug}`),
        },
      })),
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seoTitle,
    description: service.lead,
    url: absoluteUrl(`/uslugi/${service.slug}`),
    image: absoluteUrl(service.image),
    areaServed: {
      "@type": "City",
      name: site.city,
    },
    provider: {
      "@id": `${site.url}/#business`,
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
