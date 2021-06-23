export type Item = {
  name: string;
  group?: number;
};

export type Group = {
  label: string;
  id: string | number;
};

export const items: Item[] = [
  {
    name: 'Скрепка',
    group: 2,
  },
  {
    name: 'Глаз',
    group: 1,
  },
  {
    name: 'Две галочки',
    group: 1,
  },
  {
    name: 'Чемодан',
    group: 2,
  },
  {
    name: 'Солнце',
    group: 2,
  },
];

export const groups: Group[] = [
  {
    id: 1,
    label: 'Первая группа',
  },
  {
    id: 2,
    label: 'Вторая группа',
  },
  {
    id: 3,
    label: 'Третья группа',
  },
];
