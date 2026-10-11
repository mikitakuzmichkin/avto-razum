export type EcuListing = {
  title: string;
  vehicle: string;
  text?: string;
  article: string;
  parts: string;
  price: string;
  href?: string;
  image: string;
  imageAlt: string;
  /** Дополнительные фото той же запчасти. */
  photos?: { image: string; imageAlt: string }[];
};

/** Объявления с Bamper. Фото лежат в public/images/ebu. */
export const ecuListings: EcuListing[] = [
  {
    title: "Блок управления двигателем",
    vehicle: "Scania R500 · 2018",
    article: "2853096",
    parts:
      "2853096, 2445396, 2402262, 2641660, 3086129, 2996981, 2930326, 2916903, 2890393, 2882671, 2841956, 2818491, 2806408, 2771798, 2717274, 2664549, 2620002, 2556169, 2559195, 2597334, 2659468, 2621337, 2765102, 2782840, 2541622, 3183909, 3172599, 3084026, 3083600, 2990265, 3092297, 2751962, 1857180, 2641658, 900671001",
    price: "2 450 р.",
    href: "https://bamper.by/zapchast_blok-upravleniya-dvigatelem/42356-2853096/?preview=Y",
    image: "/images/ebu/scania-edc.jpg",
    imageAlt: "Блок управления двигателем Scania R500 со стороны разъёмов",
  },
  {
    title: "Кран модулятор EBS",
    vehicle: "MAN TGL · 2018",
    text: "Подпедальный кран EBS.",
    article: "81521306284",
    parts:
      "81258087047, 81258087054, 81258087049, 81258087065, 81258087077, 81258087086, 81258087085, 81258087076, 81258087064, 81258087048, 81258087053, 81258087046",
    price: "3 000 р.",
    href: "https://bamper.by/zapchast_kran-modulyator-ebs/42356-81521306284/?preview=Y",
    image: "/images/ebu/man-ebs.jpg",
    imageAlt: "Кран модулятор EBS к MAN TGL",
  },
  {
    title: "Блок управления PTM",
    vehicle: "MAN TGX · 2018",
    article: "8125805-7154",
    parts: "81258057142, 81258057149, 81258057153, 81258057150, 81258057161, 81258057154",
    price: "1 450 р.",
    href: "https://bamper.by/zapchast_blok-upravleniya-ptm/42356-8125805-7154/?preview=Y",
    image: "/images/ebu/man-ptm.jpg",
    imageAlt: "Блок управления PTM MAN TGX, корпус Continental",
  },
  {
    title: "Клапан управления турбиной",
    vehicle: "DAF XF · 2018 · 12,7 л",
    text: "Восстановленный актуатор с двигателя Евро 6. Обмен на неисправный и установочный комплект. Ремонт до 5 часов.",
    article: "1721136",
    parts:
      "1721136, 2201112, 2296204, 2175723, 2140163, 2348173, 5603456, 2047386, 5330075, 3789653, 4032772, 10R0312572, 2393599, 1978404, 2037560, 5322880, 05452691",
    price: "1 500 р.",
    href: "https://bamper.by/zapchast_klapan-upravleniya-turbinoy-actuator/42356-1721136/?preview=Y",
    image: "/images/ebu/daf-actuator.jpg",
    imageAlt: "Восстановленный актуатор турбины DAF XF с установочным комплектом",
  },
  {
    title: "Блок управления двигателем",
    vehicle: "DAF XF106 · 2019",
    text: "Восстановленный. Гарантия 12 месяцев. Ремонт аппаратной части — до 5 часов. При программном сбое подберём вариант. Работаем по безналу.",
    article: "203370522",
    parts: "2015228, 2109556, 2298832",
    price: "2 500 р.",
    image: "/images/ebu/daf-xf106-ecu.jpg",
    imageAlt: "Блок управления двигателем DAF XF106, вид сверху",
    photos: [
      {
        image: "/images/ebu/daf-xf106-ecu-2.jpg",
        imageAlt: "Блок управления двигателем DAF XF106 крупно, шильдик PACCAR Delphi",
      },
    ],
  },
];
