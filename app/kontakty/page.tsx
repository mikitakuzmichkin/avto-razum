import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { LeadForm } from "@/components/LeadForm";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Контакты и запись",
  description:
    "Запись в AVTO RAZUM, Минск: форма приходит мастеру. Instagram @avto.razum и Яндекс Карты.",
  path: "/kontakty",
});

type Props = {
  searchParams: Promise<{ service?: string }>;
};

async function BookingForm({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = services.some((item) => item.slug === service) ? service : "";
  return <LeadForm key={selected || "empty"} services={services} defaultService={selected} />;
}

export default function ContactsPage({ searchParams }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{site.city}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Контакты</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Заявка с формы приходит мастеру. Или можно написать в Instagram.
        </p>
      </header>
      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <dl className="space-y-8 lg:col-span-5">
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Instagram</dt>
            <dd className="mt-2">
              <a href={site.instagram} className="text-lg underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noopener noreferrer">
                {site.instagramHandle}
              </a>
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Карты</dt>
            <dd className="mt-2">
              <a href={site.mapUrl} className="text-lg underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noopener noreferrer">
                Яндекс Карты
              </a>
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Телефон</dt>
            <dd className="mt-2 text-lg">
              {site.phoneIsPlaceholder ? (
                site.phone
              ) : (
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="underline decoration-white/30 underline-offset-4">
                  {site.phone}
                </a>
              )}
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Адрес</dt>
            <dd className="mt-2 text-lg leading-relaxed">{site.address}</dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Юрлицо</dt>
            <dd className="mt-2 text-lg">
              {site.legalName}, УНП {site.unp}
            </dd>
          </div>
          <div className="border-t border-line pt-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">Часы</dt>
            <dd className="mt-2 text-lg">{site.hours}</dd>
          </div>
        </dl>
        <div id="zayavka" className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
          <h2 className="font-serif text-4xl">Заявка</h2>
          <div className="mt-8">
            <Suspense fallback={<p className="text-sm text-muted">Открываем форму…</p>}>
              <BookingForm searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
      <a
        href={site.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-16 block w-[calc(100%/1.3)] overflow-hidden border border-line"
      >
        <Image
          src={site.mapImage}
          alt="Яндекс Карта: агрогородок Новый Двор, Центральная улица, 50"
          width={1024}
          height={703}
          className="h-auto w-full"
        />
      </a>
      <a
        href={site.routeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-foreground bg-foreground px-5 py-3 text-[15px] font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5L18.5 12 14 14.5Z" />
        </svg>
        Построить маршрут
      </a>
    </div>
  );
}
