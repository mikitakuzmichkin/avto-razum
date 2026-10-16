import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const links = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/raboty", label: "Работы" },
  { href: "/kontakty", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-14 md:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-14 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline} в Минске. Антикор кабин и рам, электрика.
          </p>
        </div>
        <nav className="md:col-span-3" aria-label="Навигация в подвале">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Сайт</p>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Связь</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.instagram} className="underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noopener noreferrer">
                Instagram {site.instagramHandle}
              </a>
            </li>
            <li>
              <a href={site.mapUrl} className="underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noopener noreferrer">
                Яндекс Карты
              </a>
            </li>
            <li>
              {site.phoneIsPlaceholder ? site.phone : <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>}
              <p className="text-muted">{site.phoneCaption}</p>
            </li>
            <li className="text-muted">{site.address}</li>
            <li className="text-muted">{site.hours}</li>
            <li className="text-muted">
              {site.legalName}, УНП {site.unp}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:justify-between md:px-8">
          <p>
            {site.legalName} · УНП {site.unp}
          </p>
          <p>Антикор · Электрика · Покраска</p>
        </div>
      </div>
    </footer>
  );
}
