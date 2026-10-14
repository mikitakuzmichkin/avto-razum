import type { Metadata } from "next";
import { ServiceCatalog } from "@/components/ServiceList";
import { marked } from "@/lib/marked";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Услуги автотехцентра в Минске",
  description:
    "Услуги AVTO RAZUM в Минске: антикор кабин и рам, электрика, тепло и шум, ремонт ЭБУ, отключение AdBlue, пневмосиденья, удаление DPF, гидрофикация, покраска.",
  path: "/uslugi",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Минск</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Услуги</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          {marked(
            "Антикор кабин и рам — для грузовиков, легковые пока не обрабатываем. Электрика легковых и грузовых. Каждая работа со своей страницей и записью.",
            ["Антикор кабин и рам", "Электрика"],
          )}
        </p>
      </header>
      <ServiceCatalog />
    </div>
  );
}
