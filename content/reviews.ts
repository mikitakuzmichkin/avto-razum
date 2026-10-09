export type Review = {
  id: string;
  name: string;
  vehicle: string;
  text: string;
  draft: true;
};

/**
 * Черновики для вёрстки. Перед публикацией замените на реальные отзывы.
 * В schema.org эти тексты не попадают.
 */
export const reviews: Review[] = [
  {
    id: "rama",
    name: "Алексей",
    vehicle: "Тягач",
    text: "Раму обработали спокойно и по делу. Показали, что закрыли, без театра вокруг ямы.",
    draft: true,
  },
  {
    id: "sedan",
    name: "Марина",
    vehicle: "Седан",
    text: "Элемент покрасили в цвет. Стык не ищешь взглядом — панель просто снова целая.",
    draft: true,
  },
  {
    id: "sidenie",
    name: "Игорь",
    vehicle: "Кабина",
    text: "Сиденье снова держит. Смена перестала быть наказанием для спины.",
    draft: true,
  },
  {
    id: "elektrika",
    name: "Денис",
    vehicle: "Фургон",
    text: "По электрике сказали причину, а не список запчастей. Починили именно её.",
    draft: true,
  },
];
