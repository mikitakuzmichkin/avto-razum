import { SiteImage } from "@/components/SiteImage";
import Link from "next/link";
import { services } from "@/content/services";
import { marked } from "@/lib/marked";

export function ServiceRows() {
  return (
    <ol>
      {services.map((service, index) => (
        <li key={service.slug} className="border-t border-line">
          <Link
            href={`/uslugi/${service.slug}`}
            className="group flex items-start justify-between gap-6 py-6 md:py-8"
          >
            <span className="w-10 shrink-0 pt-2 text-[11px] tracking-[0.18em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-3xl leading-none md:text-5xl">
                {service.title}
              </span>
              <span className="mt-3 block text-sm text-muted">{service.short}</span>
            </span>
            <span className="pt-2 text-[11px] uppercase tracking-[0.2em] text-muted group-hover:text-foreground" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function ServiceCatalog() {
  return (
    <ol className="mt-16">
      {services.map((service, index) => (
        <li key={service.slug} className="border-t border-line py-12 md:py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-[11px] tracking-[0.18em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-serif text-5xl leading-none md:text-6xl">
                <Link href={`/uslugi/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed">
                {marked(service.lead, service.leadMarks)}
              </p>
              <Link
                href={`/uslugi/${service.slug}`}
                className="mt-8 inline-flex text-[11px] uppercase tracking-[0.2em] underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Подробнее
              </Link>
            </div>
            <Link
              href={`/uslugi/${service.slug}`}
              className={`group relative block aspect-[16/9] overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <SiteImage
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
