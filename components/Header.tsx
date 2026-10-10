"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/styles";
import { brands } from "@/content/brands";
import { services } from "@/content/services";

const links = [
  { href: "/raboty", label: "Работы" },
  { href: "/kontakty", label: "Контакты" },
];

function BrandMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const track = el.querySelector(".brand-track");
    if (track instanceof HTMLElement) track.style.animation = "none";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let dragging = false;
    let moved = false;
    let suppressClick = false;
    let pointerType = "";
    let startX = 0;
    let lastX = 0;
    let offset = 0;
    let last = performance.now();
    let frame = 0;
    let suppressTimer = 0;
    let ignoreHoverUntil = 0;

    const loopWidth = () => el.scrollWidth / 2;

    const wrap = (value: number) => {
      const width = loopWidth();
      if (width <= 0) return value;
      let next = value;
      while (next >= width) next -= width;
      while (next < 0) next += width;
      return next;
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const width = loopWidth();
      if (!paused && el.offsetParent !== null && width > 0) {
        offset = wrap(offset + (dt / 42000) * width);
        el.scrollLeft = offset;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || performance.now() < ignoreHoverUntil) return;
      paused = true;
    };

    const onLeave = (event: PointerEvent) => {
      if (dragging || event.pointerType === "touch") return;
      paused = false;
      offset = el.scrollLeft;
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      if (Math.abs(event.clientX - startX) > 8) {
        moved = true;
        el.classList.add("is-dragging");
      }
      if (!moved || dx === 0) return;
      offset = wrap(offset - dx);
      el.scrollLeft = offset;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.classList.remove("is-dragging");
      if (moved) {
        suppressClick = true;
        window.clearTimeout(suppressTimer);
        suppressTimer = window.setTimeout(() => {
          suppressClick = false;
        }, 400);
      }
      if (pointerType === "touch") ignoreHoverUntil = performance.now() + 800;
      if (pointerType === "touch" || !el.matches(":hover")) paused = false;
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      paused = true;
      dragging = true;
      moved = false;
      pointerType = event.pointerType;
      startX = event.clientX;
      lastX = event.clientX;
      offset = el.scrollLeft;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      window.clearTimeout(suppressTimer);
      event.preventDefault();
      event.stopPropagation();
    };

    const onWheel = (event: WheelEvent) => {
      if (!paused) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      offset = wrap(el.scrollLeft + delta);
      el.scrollLeft = offset;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    document.addEventListener("click", onClick, true);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(suppressTimer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("click", onClick, true);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={scrollerRef} className="brand-marquee" aria-label="Марки, с которыми работаем">
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
