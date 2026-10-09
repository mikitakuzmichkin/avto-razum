"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/styles";

const links = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/raboty", label: "Работы" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" aria-label="AVTO RAZUM, на главную" className="shrink-0">
          <Logo priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основное меню">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/kontakty#zayavka" className="hidden md:inline-flex">
            <span className={buttonClass}>Запись</span>
          </Link>
          <button
            type="button"
            className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-menu" className="border-t border-line px-5 py-2 md:hidden" aria-label="Мобильное меню">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 text-[11px] uppercase tracking-[0.2em]"
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
