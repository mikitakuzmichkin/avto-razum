import type { Metadata } from "next";
import { SiteImage } from "@/components/SiteImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { buttonClass } from "@/components/styles";
import { brandMark, brands, getBrand } from "@/content/brands";
import { breadcrumbSchema } from "@/lib/schema";
import { marked } from "@/lib/marked";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return pageMetadata({
    title: brand.title,
    description: brand.description,
    path: `/marki/${brand.slug}`,
  });
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", path: "/" },
          { name: "Марки", path: "/marki" },
          { name: brand.name, path: `/marki/${brand.slug}` },
        ])}
      />
      <nav className="text-[11px] uppercase tracking-[0.18em] text-muted" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-foreground">
          Главная
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/marki" className="hover:text-foreground">
          Марки
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">{brand.name}</span>
      </nav>
      <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div>
          <SiteImage
            src={brandMark(brand.slug)}
            alt=""
            width={240}
            height={48}
            unoptimized
            className="rounded-lg bg-white"
            style={{ width: "auto", height: "2.25rem", aspectRatio: "auto" }}
          />
          <h1 className="mt-6 font-serif text-5xl leading-[0.95] md:text-6xl">
            {marked(brand.title, brand.titleMarks)}
          </h1>
          <p className="mt-6 text-lg leading-relaxed">{marked(brand.lead, brand.leadMarks)}</p>
          {brand.notes ? (
            <div className="mt-8 border border-line p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Важно знать</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                {brand.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          ) : null}
          <Link href="/kontakty#zayavka" className={`${buttonClass} mt-8`}>
            Записаться
          </Link>
        </div>
        <div>
          <SiteImage
            src={brand.truck ?? `/images/brands/${brand.slug}-truck.jpg`}
            alt={`${brand.name}, грузовик`}
            width={1280}
            height={720}
            priority
            className="aspect-video w-full rounded-2xl object-cover"
          />
          <div className="mt-6 border border-line p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Выполняем</p>
          <ol className="mt-6 space-y-4">
            {brand.works.map((work, index) => (
              <li key={work} className="flex gap-4 text-sm leading-relaxed">
                <span className="shrink-0 text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span>{work}</span>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
      {brand.parts ? (
        <section className="mt-12 border border-line p-6 md:p-8">
          <h2 className="text-lg">{brand.parts.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{brand.parts.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {brand.parts.codes.map((code) => (
              <li key={code} className="border border-line px-3 py-1.5 text-sm tracking-wide">
                {code}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
