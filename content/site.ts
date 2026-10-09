export const site = {
  name: "AVTO RAZUM",
  tagline: "Экспертный автотехцентр",
  city: "Минск",
  country: "Беларусь",
  countryCode: "BY",
  regionCode: "BY-HM",
  description:
    "Экспертный автотехцентр AVTO RAZUM в Минске: покраска, антикор кабин и рам, электрика, тепло и шум, ремонт ЭБУ, отключение AdBlue и пневмосиденья.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  instagram: "https://instagram.com/avto.razum",
  instagramHandle: "@avto.razum",
  mapUrl: "https://yandex.by/maps/-/CXeZMQPK",
  /** Шаблон. Замените на рабочий номер перед публикацией. */
  phone: "+375 (29) 384-17-52",
  phoneIsPlaceholder: false,
  /** Шаблон. Замените на реальную улицу и дом перед публикацией. */
  address: "ул. Селицкого, 15",
  addressIsPlaceholder: false,
  /** Шаблон. Замените на фактический график перед публикацией. */
  hours: "Пн–сб, 9:00–19:00",
  hoursIsPlaceholder: false,
} as const;
