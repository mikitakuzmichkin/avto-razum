import Link from "next/link";
import { buttonClass } from "@/components/styles";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-28 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-4 font-serif text-5xl md:text-7xl">Страница не найдена</h1>
      <p className="mt-6 max-w-md text-muted">Такой страницы нет. Услуги и запись — на своих местах.</p>
      <Link href="/" className={`${buttonClass} mt-10`}>
        На главную
      </Link>
    </div>
  );
}
