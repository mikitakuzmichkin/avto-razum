import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brandMark, brands } from "@/content/brands";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Марки грузовиков",
  description:
    "Марки, с которыми работает AVTO RAZUM: MAN, Mercedes-Benz, Scania, Volvo, Renault, DAF, IVECO, МАЗ, КамАЗ и китайские грузовики.",
  path: "/marki",
});

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Минск</p>
      <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Марки</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Нажмите марку, чтобы открыть работы именно по ней.
      </p>
      <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <li key={brand.slug} className="bg-background">
            <Link href={`/marki/${brand.slug}`} className="flex items-center gap-4 px-6 py-6 text-lg hover:bg-white/5">
              <span className="flex h-10 w-36 shrink-0 items-center justify-center rounded-lg bg-white px-2">
                <Image
                  src={brandMark(brand.slug)}
                  alt=""
                  width={720}
                  height={160}
                  unoptimized
                  className="max-h-7 max-w-full object-contain"
                  style={{ width: "auto", height: "auto", maxHeight: "1.75rem", maxWidth: "100%", aspectRatio: "auto" }}
                />
              </span>
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
