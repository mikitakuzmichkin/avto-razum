import type { Metadata } from "next";
import { ServiceCatalog } from "@/components/ServiceList";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Услуги автотехцентра в Минске",
  description:
    "Услуги AVTO RAZUM в Минске: покраска, антикор кабин и рам, электрика, тепло и шум, ремонт ЭБУ, отключение AdBlue, пневмосиденья.",
  path: "/uslugi",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Минск</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Услуги</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Покраска и ремонт легковых и грузовых. Кабины, рамы, электрика, тишина в салоне — каждая работа со своей страницей и записью.
        </p>
      </header>
      <ServiceCatalog />
    </div>
  );
}
