import { NextResponse } from "next/server";
import { getService, services } from "@/content/services";

type Lead = {
  name: string;
  phone: string;
  service: string;
  car: string;
  message: string;
};

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function validate(body: unknown): { ok: true; lead: Lead } | { ok: false; error: string } | { ok: true; ignore: true } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Некорректная заявка." };
  }
  const data = body as Record<string, unknown>;
  if (clean(data.company, 200)) return { ok: true, ignore: true };

  const name = clean(data.name, 80);
  const phone = clean(data.phone, 40);
  const service = clean(data.service, 40);
  const car = clean(data.car, 80);
  const message = clean(data.message, 1000);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) return { ok: false, error: "Укажите имя." };
  if (digits.length < 7) return { ok: false, error: "Укажите телефон, по которому можно перезвонить." };
  if (!services.some((item) => item.slug === service)) {
    return { ok: false, error: "Выберите услугу из списка." };
  }

  return { ok: true, lead: { name, phone, service, car, message } };
}

export async function POST(request: Request) {
  if (limited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте ещё раз через несколько минут." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  if ("ignore" in result) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось отправить заявку. Попробуйте ещё раз чуть позже.",
      },
      { status: 503 },
    );
  }

  const serviceTitle = getService(result.lead.service)?.title ?? result.lead.service;
  const text = [
    "Новая заявка AVTO RAZUM",
    `Имя: ${result.lead.name}`,
    `Телефон: ${result.lead.phone}`,
    `Услуга: ${serviceTitle}`,
    `Авто: ${result.lead.car || "—"}`,
    `Комментарий: ${result.lead.message || "—"}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз чуть позже." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз чуть позже." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
