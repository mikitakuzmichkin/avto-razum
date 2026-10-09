import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { WorkGrid } from "@/components/WorkGrid";
import { buttonClass } from "@/components/styles";
import { getService, services } from "@/content/services";
import { worksFor } from "@/content/works";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.description,
    path: `/uslugi/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((item) => item.slug === service.slug);
  const related = worksFor(service.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", path: "/" },
          { name: "Услуги", path: "/uslugi" },
          { name: service.title, path: `/uslugi/${service.slug}` },
        ])}
      />
      <nav className="text-[11px] uppercase tracking-[0.18em] text-muted" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-foreground">Главная</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/uslugi" className="hover:text-foreground">Услуги</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">{service.title}</span>
      </nav>
      <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.18em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl">{service.seoTitle}</h1>
          <p className="mt-6 text-lg leading-relaxed">{service.lead}</p>
          <ul className="mt-8 space-y-3 border-t border-line pt-6">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-4 text-sm">
                <span className="text-muted" aria-hidden="true">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href={`/kontakty?service=${service.slug}#zayavka`} className={`${buttonClass} mt-10`}>
            Записаться
          </Link>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-20 border-t border-line pt-16" aria-labelledby="related-works">
          <h2 id="related-works" className="font-serif text-4xl md:text-5xl">
            Примеры
          </h2>
          <div className="mt-10">
            <WorkGrid items={related} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
