export type Work = {
  slug: string;
  title: string;
  service: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Файл в public, например /videos/works/rama.mp4. image остаётся постером. */
  video?: string;
  /** Горизонтальное видео на всю ширину, вертикальное — узкая колонка 9:16. */
  orientation?: "horizontal" | "vertical";
  wide?: boolean;
  tall?: boolean;
  featured?: boolean;
};

/** Свою работу добавляйте объектом в этот массив. Фото — в public/images/works, видео — в public/videos/works. */
export const works: Work[] = [
  {
    slug: "suv-bort-video",
    title: "SUV, обход после окраса",
    service: "pokraska",
    description:
      "Короткий обход боковины. Тон держится на дневном свете у ворот.",
    image: "/images/works/suv-street.jpg",
    imageAlt: "SUV после окраса борта, горизонтальный ролик",
    video: "/videos/works/suv-bort.mp4",
    orientation: "horizontal",
    featured: true,
  },
  {
    slug: "furgon-ugol-video",
    title: "Фургон, угол в кадре",
    service: "pokraska",
    description:
      "Вертикальный кадр переднего угла. Переход уходит в соседнюю деталь.",
    image: "/images/works/van-street.jpg",
    imageAlt: "Передний угол фургона, вертикальный ролик",
    video: "/videos/works/furgon-ugol.mp4",
    orientation: "vertical",
    featured: true,
  },
  {
    slug: "sedan-polnaya",
    title: "Седан, полная покраска",
    service: "pokraska",
    description:
      "Ровный слой по всему кузову. Блик идёт одной линией, стыки не приходится искать.",
    image: "/images/works/sedan-yard.jpg",
    imageAlt: "Седан после покраски на площадке у мастерской",
    wide: true,
    featured: true,
  },
  {
    slug: "kabina-tyagacha",
    title: "Кабина тягача",
    service: "pokraska",
    description:
      "Окрас кабины целиком. Панели сходятся, стекло и кромки читаются чисто.",
    image: "/images/works/cabin-yard.jpg",
    imageAlt: "Окрашенная кабина тягача во дворе мастерской",
    tall: true,
    featured: true,
  },
  {
    slug: "rama-antikor",
    title: "Рама после антикора",
    service: "antikor",
    description:
      "Силовые элементы закрыты покрытием. Металл больше не встречает соль голым.",
    image: "/images/works/frame-shop.jpg",
    imageAlt: "Рама грузовика после антикоррозийного покрытия",
    featured: true,
  },
  {
    slug: "suv-bort",
    title: "SUV, окрас борта",
    service: "pokraska",
    description:
      "Локальный окрас боковины. Тон подобран к соседней панели.",
    image: "/images/works/suv-street.jpg",
    imageAlt: "SUV после окраса борта у ворот мастерской",
    wide: true,
  },
  {
    slug: "pnevmosidenie",
    title: "Пневмосиденье в кабине",
    service: "pnevmosidenya",
    description:
      "Сиденье снова держит ход. Посадка собрана под длинную смену.",
    image: "/images/works/seat-cabin.jpg",
    imageAlt: "Отремонтированное пневмосиденье в кабине грузовика",
  },
  {
    slug: "furgon-ugol",
    title: "Фургон, передний угол",
    service: "pokraska",
    description:
      "Локальный окрас угла. Переход ушёл в соседнюю деталь без пятна.",
    image: "/images/works/van-street.jpg",
    imageAlt: "Передний угол фургона после локальной покраски на улице",
    tall: true,
  },
];

export function worksFor(serviceSlug: string) {
  return works.filter((work) => work.service === serviceSlug);
}

export const featuredWorks = works.filter((work) => work.featured);
