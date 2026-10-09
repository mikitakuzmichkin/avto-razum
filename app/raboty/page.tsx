import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { works } from "@/content/works";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Примеры работ",
  description:
    "Примеры антикора рам, ремонта пневмосидений и покраски AVTO RAZUM в Минске. Живые работы добавляются в галерею.",
  path: "/raboty",
  image: "/images/works/suv-street.jpg",
});

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Галерея</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Работы</h1>
      </header>
      <div className="mt-14">
        <WorkGrid items={works} />
      </div>
    </div>
  );
}
