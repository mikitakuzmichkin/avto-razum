import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { HeadlightCar } from "@/components/HeadlightCar";
import { HomeBrands } from "@/components/HomeBrands";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { ServiceRows } from "@/components/ServiceList";
import { HomeWorks } from "@/components/HomeWorks";
import { buttonClass, buttonGhostClass } from "@/components/styles";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section className="relative z-[2] border-b border-line">
        <div className="relative bg-black">
        <div className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden lg:block">
          <HeadlightCar />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Минск · экспертный автотехцентр
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,7.2vw,5.1rem)] leading-[0.92]">
              <span className="block">Антикор</span>
              <span className="block">и электрика</span>
              <span className="block">в Минске</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Кабины, рамы и проводка. Называем точные сроки и стоимость сразу после осмотра. Гарантия на работу.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/kontakty#zayavka" className={buttonClass}>
                Записаться
              </Link>
              <Link href="/uslugi" className={buttonGhostClass}>
                Услуги
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="services-heading">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="services-heading" className="font-serif text-5xl leading-none md:text-6xl">
            Услуги
          </h2>
          <Link href="/uslugi" className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground">
            Все
          </Link>
        </div>
        <ServiceRows />
      </section>

      <HomeBrands />

      <section className="border-t border-line" aria-labelledby="works-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 id="works-heading" className="font-serif text-5xl leading-none md:text-6xl">
              Работы
            </h2>
            <Link href="/raboty" className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground">
              Все
            </Link>
          </div>
          <HomeWorks />
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <h2 id="faq-heading" className="mb-10 font-serif text-5xl leading-none md:text-6xl">
            Вопросы
          </h2>
          <FaqList items={faq} />
        </div>
      </section>

      <section id="zayavka" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Запись</p>
            <h2 className="mt-4 font-serif text-5xl leading-none md:text-6xl">Коротко о задаче</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Имя, телефон и что случилось с машиной. Заявка приходит мастеру.
            </p>
          </div>
          <LeadForm services={services} />
        </div>
      </section>
    </>
  );
}
