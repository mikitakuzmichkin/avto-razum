"use client";

import { useState, type FormEvent } from "react";
import type { Service } from "@/content/services";
import { fieldClass, labelClass } from "@/components/styles";

type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success" }
  | { type: "error"; message: string };

export function LeadForm({
  services,
  defaultService = "",
}: {
  services: Pick<Service, "slug" | "title">[];
  defaultService?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [car, setCar] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "sending" });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, car, message, company }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        });
        return;
      }
      setStatus({ type: "success" });
      setName("");
      setPhone("");
      setCar("");
      setMessage("");
      setCompany("");
    } catch {
      setStatus({
        type: "error",
        message: "Нет связи с сервером. Проверьте интернет и отправьте заявку снова.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="border border-line px-6 py-10" role="status">
        <p className="font-serif text-4xl leading-none">Заявка ушла мастеру</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Мы свяжемся по указанному телефону.
        </p>
        <button
          type="button"
          className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground"
          onClick={() => setStatus({ type: "idle" })}
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Компания
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
      </div>
      <label className="block">
        <span className={labelClass}>Имя</span>
        <input
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Телефон</span>
        <input
          required
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={40}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={fieldClass}
          placeholder="+375"
        />
      </label>
      <label className="relative block">
        <span className={labelClass}>Услуга</span>
        <select
          required
          value={service}
          onChange={(event) => setService(event.target.value)}
          className={`${fieldClass} appearance-none pr-8`}
        >
          <option value="">Выберите услугу</option>
          {services.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute bottom-3 right-0 text-[11px] text-muted" aria-hidden="true">
          ↓
        </span>
      </label>
      <label className="block">
        <span className={labelClass}>Авто</span>
        <input
          maxLength={80}
          value={car}
          onChange={(event) => setCar(event.target.value)}
          className={fieldClass}
          placeholder="Марка и модель"
          autoComplete="off"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Комментарий</span>
        <textarea
          maxLength={1000}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="Что случилось и к какому сроку"
        />
      </label>
      {status.type === "error" ? (
        <p role="alert" className="text-sm leading-relaxed text-foreground">
          {status.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status.type === "sending"}
        className="inline-flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {status.type === "sending" ? "Отправляем" : "Отправить заявку"}
      </button>
    </form>
  );
}
