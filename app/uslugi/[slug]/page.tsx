import type { Metadata } from "next";
import { SiteImage } from "@/components/SiteImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { EcuListings } from "@/components/EcuListings";
import { PaintPartners } from "@/components/PaintPartners";
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
  const topics = service.topics;

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd data={serviceSchema(service)} />
      {service.faq ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      ) : null}
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
        <div className="min-w-0 lg:col-span-6">
          <p className="text-[11px] tracking-[0.18em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-4 max-w-full text-balance font-serif text-4xl leading-[1.2] hyphens-auto sm:text-5xl lg:text-[2.5rem] xl:text-[2.85rem]">
            {service.seoTitle}
          </h1>
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
        <div className="relative aspect-[16/9] overflow-hidden border border-line lg:col-span-6 lg:aspect-auto lg:min-h-[32rem]">
          <SiteImage
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      {service.highlights ? (
        <ul
          className={`mt-16 grid gap-3 ${service.highlights.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        >
          {service.highlights.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line px-6 py-6">
              <h2 className="text-lg">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {topics ? (
        <div
          className={`mt-6 grid gap-3 ${topics.length > 2 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}
        >
          {topics.map((topic) => (
            <section key={topic.title} className="rounded-2xl border border-line px-6 py-6">
              <h2 className={`font-serif leading-none ${topics.length > 2 ? "text-2xl" : "text-3xl"}`}>
                {topic.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{topic.text}</p>
              {topic.href && topic.link ? (
                <Link href={topic.href} className="mt-5 inline-block text-sm hover:text-muted">
                  {topic.link}
                </Link>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
      {service.faq ? (
        <section className="mt-20 border-t border-line pt-16" aria-labelledby="service-faq">
          <h2 id="service-faq" className="font-serif text-4xl md:text-5xl">
            Частые вопросы
          </h2>
          <dl className="mt-10 divide-y divide-line">
            {service.faq.map((item) => (
              <div key={item.question} className="py-6">
                <dt className="text-lg">{item.question}</dt>
                <dd className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      {service.slug === "remont-ebu" ? <EcuListings /> : null}
      {service.slug === "pokraska" ? <PaintPartners /> : null}
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
