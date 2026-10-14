import { SiteImage } from "@/components/SiteImage";
import Link from "next/link";
import { brandMark, brands, type Brand } from "@/content/brands";

const cardSlugs = [
  "man",
  "mercedes-benz",
  "scania",
  "volvo",
  "renault",
  "daf",
  "iveco",
  "maz",
  "kamaz",
  "dongfeng",
  "faw",
  "foton",
  "jac",
  "shacman",
  "sitrak",
] as const;

const cardClass =
  "flex h-full flex-col rounded-2xl border border-line bg-white/[0.04] px-3 pb-4 pt-3 transition-colors hover:bg-white/[0.08]";
const nameClass = "mt-3 text-center text-[13px] leading-tight text-muted";

function brandBySlug(slug: string): Brand {
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) throw new Error(`Unknown brand: ${slug}`);
  return brand;
}

function MarkImage({ slug }: { slug: string }) {
  return (
    <span className="flex h-20 w-full items-center justify-center rounded-lg bg-white px-3">
      <SiteImage
        src={brandMark(slug)}
        alt=""
        width={720}
        height={160}
        unoptimized
        className="max-h-16 max-w-full object-contain"
        style={{ width: "auto", height: "auto", maxHeight: "4rem", maxWidth: "100%", aspectRatio: "auto" }}
      />
    </span>
  );
}

function SingleCard({ slug }: { slug: string }) {
  const brand = brandBySlug(slug);
  return (
    <li>
      <Link href={`/marki/${brand.slug}`} className={cardClass}>
        <MarkImage slug={brand.slug} />
        <span className={nameClass}>{brand.name}</span>
      </Link>
    </li>
  );
}

export function HomeBrands() {
  return (
    <section className="border-t border-line" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="brands-heading" className="font-serif text-5xl leading-none md:text-6xl">
            Марки
          </h2>
          <Link
            href="/marki"
            className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground"
          >
            Все марки
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cardSlugs.map((slug) => (
            <SingleCard key={slug} slug={slug} />
          ))}
        </ul>
      </div>
    </section>
  );
}
