export const site = {
  name: "AVTO RAZUM",
  tagline: "Экспертный автотехцентр",
  city: "Минск",
  country: "Беларусь",
  countryCode: "BY",
  /** Мастерская в Минском районе, не в городе Минске. */
  regionCode: "BY-MI",
  locality: "Новый Двор",
  description:
    "Экспертный автотехцентр AVTO RAZUM в Минске: покраска, антикор кабин и рам, электрика, тепло и шум, ремонт ЭБУ, отключение AdBlue и пневмосиденья.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  instagram: "https://instagram.com/avto.razum",
  instagramHandle: "@avto.razum",
  mapUrl: "https://yandex.by/maps/-/CXeZMQPK",
  phone: "+375 (44) 554-25-59",
  phoneIsPlaceholder: false,
  address:
    "Минский район, Новодворский сельсовет, агрогородок Новый Двор, Центральная улица, 50",
  streetAddress: "Центральная улица, 50",
  addressRegion: "Минский район",
  addressIsPlaceholder: false,
  legalName: "ООО АвтоРазум",
  unp: "693339740",
  /** Шаблон. Замените на фактический график перед публикацией. */
  hours: "Пн–сб, 9:00–19:00",
  hoursIsPlaceholder: false,
} as const;
