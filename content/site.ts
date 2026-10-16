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
    "Экспертный автотехцентр AVTO RAZUM в Минске: антикор кабин и рам, электрика, тепло и шум, ремонт ЭБУ, отключение AdBlue, пневмосиденья, удаление DPF и покраска.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  instagram: "https://instagram.com/avto.razum",
  instagramHandle: "@avto.razum",
  mapUrl:
    "https://yandex.by/maps/?ll=27.661619%2C53.816701&z=18&pt=27.661619,53.816701&text=%D0%B0%D0%B3%D1%80%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%BA%20%D0%9D%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%94%D0%B2%D0%BE%D1%80%2C%20%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2050",
  mapImage: "/images/map-address.jpg",
  routeUrl: "https://yandex.by/maps/?rtext=~53.816701,27.661619&rtt=auto",
  phone: "+375 (44) 554-25-59",
  phoneCaption: "Андрей, Пн–сб, 9:00–19:00",
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
