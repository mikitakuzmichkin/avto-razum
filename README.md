# AVTO RAZUM

Черно-белый сайт экспертного автотехцентра в Минске. Заявки с формы уходят в Telegram.

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

На Windows файл окружения можно скопировать так: `copy .env.example .env.local`.

Перед публикацией укажите боевой адрес в `NEXT_PUBLIC_SITE_URL` без слэша на конце и пересоберите проект. От него зависят canonical, sitemap и разметка для поиска.

## Что править руками

- Контакты — [content/site.ts](content/site.ts): ООО АвтоРазум, УНП 693339740, +375 (44) 554-25-59, агрогородок Новый Двор, Центральная улица, 50, пн–сб 9:00–19:00. Если снова поставите заглушку, включите `phoneIsPlaceholder` или `addressIsPlaceholder`, чтобы выдуманные данные не попали в разметку для поиска.
- Услуги — [content/services.ts](content/services.ts).
- Примеры работ — фото в `public/images/works`, видео в `public/videos/works`, запись в [content/works.ts](content/works.ts). У видео укажите `video` и `orientation`: `horizontal` или `vertical`. Поле `image` — постер.
- Отзывы — [content/reviews.ts](content/reviews.ts). Сейчас это черновики для вёрстки. В schema.org они не попадают. Замените тексты до запуска.

## Telegram

1. В Telegram откройте @BotFather и создайте бота. Токен вставьте в `TELEGRAM_BOT_TOKEN`.
2. Напишите этому боту любое сообщение со своего аккаунта (или добавьте бота в нужный чат и напишите туда).
3. Откройте в браузере `https://api.telegram.org/bot<ТОКЕН>/getUpdates`.
4. В ответе найдите `message.chat.id` и вставьте его в `TELEGRAM_CHAT_ID`.
5. Перезапустите сервер.

Пока токен не задан, форма отвечает, что заявки ещё не подключены, и сайт при этом собирается.

## Поиск и ответы ИИ

В проекте уже есть title и description, sitemap, robots, Open Graph, JSON-LD `AutoRepair`, `Service`, `FAQPage` и `BreadcrumbList`, а также [public/llms.txt](public/llms.txt) — короткая справка о сервисе для чат-поисковиков. Фейковые отзывы в разметку не входят.
