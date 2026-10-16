import { SiteImage } from "@/components/SiteImage";
import Link from "next/link";
import { services } from "@/content/services";
import { marked } from "@/lib/marked";

export function ServiceRows() {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <li key={service.slug} className="min-w-0">
          <Link
            href={`/uslugi/${service.slug}`}
            className="group flex h-full flex-col border border-line"
          >
            <span className="relative block aspect-[5/3] overflow-hidden">
              <SiteImage
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </span>
            <span className="flex flex-1 flex-col p-4">
              <span className="text-xs tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 font-sans text-lg font-medium leading-tight">
                {service.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{service.short}</span>
              <span className="mt-auto pt-4 text-sm text-foreground">Подробнее →</span>
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
