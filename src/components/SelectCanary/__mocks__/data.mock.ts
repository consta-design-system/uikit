export type Item = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type Group = {
  label: string;
  id: string | number;
};

export const items: Item[] = [
  {
    label: 'Синий',
    groupId: 1,
    id: 1,
  },
  {
    label: 'Красный',
    groupId: 1,
    id: 2,
  },
  {
    label: 'Жёлтый',
    groupId: 1,
    id: 3,
    disabled: true,
  },
  {
    label: 'Зелёный',
    groupId: 1,
    id: 4,
  },
  {
    label: 'Белый',
    groupId: 2,
    id: 5,
  },
  {
    label: 'Серо-буро-малиновый',
    groupId: 2,
    id: 6,
  },
  {
    label: 'Чёрный',
    groupId: 1,
    id: 7,
  },
  {
    label: 'В полоску',
    groupId: 3,
    id: 8,
  },
  {
    label: 'В клетку',
    groupId: 3,
    id: 9,
  },
  {
    label: 'Коричневый',
    groupId: 1,
    id: 10,
  },
  {
    label: 'Фиолетовый',
    groupId: 2,
    id: 11,
  },
  {
    label: 'Лиловый',
    groupId: 2,
    id: 12,
  },
  {
    label: 'Серый',
    groupId: 1,
    id: 13,
  },
  {
    label: 'В горошек',
    groupId: 3,
    id: 14,
  },
  {
    label: 'Голубой',
    groupId: 1,
    id: 15,
  },
  {
    label: 'Индиго',
    groupId: 2,
    id: 16,
  },
  {
    label: 'Серебряный',
    groupId: 2,
    id: 17,
  },
  {
    label: 'Золотой',
    groupId: 2,
    id: 18,
  },
  {
    label: 'Оранжевый',
    groupId: 2,
    id: 19,
  },
  {
    label: 'Бирюзовый',
    groupId: 2,
    id: 20,
  },
  {
    label: 'В цветочек',
    groupId: 3,
    id: 21,
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

export type MyItem = {
  name: string;
  group: string;
};

export type MyGroup = string;

export const myGroup: MyGroup[] = [
  'Первая группа',
  'Вторая группа',
  'Третья группа',
];

export const myData: MyItem[] = [
  { name: 'Первый', group: 'Первая группа' },
  { name: 'Второй', group: 'Третья группа' },
  { name: 'Третий', group: 'Вторая группа' },
  { name: 'Четвертый', group: 'Первая группа' },
  { name: 'Пятый', group: 'Первая группа' },
  { name: 'Шестой', group: 'Третья группа' },
  { name: 'Седьмой', group: 'Первая группа' },
  { name: 'Восьмой', group: 'Вторая группа' },
  { name: 'Девятый', group: 'Третья группа' },
  { name: 'Десятый', group: 'Вторая группа' },
];
