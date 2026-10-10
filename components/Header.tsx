"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/styles";
import { brands } from "@/content/brands";
import { services } from "@/content/services";

const links = [
  { href: "/raboty", label: "Работы" },
  { href: "/kontakty", label: "Контакты" },
];

function BrandMarquee() {
  return (
    <div className="brand-marquee" aria-label="Марки, с которыми работаем">
      <div className="brand-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/marki/${brand.slug}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="text-sm uppercase tracking-[0.16em] text-muted hover:text-foreground"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

const topLinkClass = "text-sm uppercase tracking-[0.14em] transition-colors";
const tabLinkClass = "shrink-0 text-base transition-colors";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center gap-6 px-5 md:px-8">
        <Link href="/" aria-label="AVTO RAZUM, на главную" className="shrink-0">
          <Logo priority className="h-11 w-auto" />
        </Link>
        <div className="hidden min-w-0 flex-1 md:block">
          <BrandMarquee />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Основное меню">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`${topLinkClass} ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link href="/kontakty#zayavka" className="hidden md:inline-flex">
            <span className={buttonClass}>Запись</span>
          </Link>
          <button
            type="button"
            className="shrink-0 text-sm uppercase tracking-[0.14em] text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      <div className="border-t border-line px-5 py-2.5 md:hidden">
        <BrandMarquee />
      </div>
      <nav className="overflow-x-auto border-t border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Услуги">
        <ul className="mx-auto flex w-max min-w-full items-center justify-center gap-x-8 px-5 py-3.5 md:px-8">
          {services.map((service) => {
            const href = `/uslugi/${service.slug}`;
            const active = pathname === href;
            return (
              <li key={service.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`${tabLinkClass} ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
                >
                  {service.tab ?? service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {open ? (
        <nav id="mobile-menu" className="border-t border-line px-5 py-2 md:hidden" aria-label="Мобильное меню">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 text-base"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakty#zayavka" onClick={() => setOpen(false)} className={`${buttonClass} my-4 w-full`}>
            Запись
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
