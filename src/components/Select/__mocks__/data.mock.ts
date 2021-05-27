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
    label: 'Neptunium',
    groupId: 1,
    id: 1,
  },
  {
    label: 'Plutonium',
    groupId: 1,
    id: 2,
  },
  {
    label: 'Americium',
    groupId: 1,
    id: 3,
    disabled: true,
  },
  {
    label: 'Curium',
    groupId: 1,
    id: 4,
  },
  {
    label: 'Berkelium',
    groupId: 2,
    id: 5,
  },
  {
    label: 'Californium Berkelium Curium Plutonium',
    groupId: 2,
    id: 6,
  },
  {
    label: 'Einsteinium',
    groupId: 1,
    id: 7,
  },
  {
    label: 'Fermium',
    groupId: 3,
    id: 8,
  },
  {
    label: 'Mendelevium',
    groupId: 3,
    id: 9,
  },
  {
    label: 'Nobelium',
    groupId: 1,
    id: 10,
  },
  {
    label: 'Lawrencium',
    groupId: 2,
    id: 11,
  },
  {
    label: 'Rutherfordium',
    groupId: 2,
    id: 12,
  },
  {
    label: 'Dubnium',
    groupId: 1,
    id: 13,
  },
  {
    label: 'Seaborgium',
    groupId: 3,
    id: 14,
  },
  {
    label: 'Bohrium',
    groupId: 1,
    id: 15,
  },
  {
    label: 'Hassium',
    groupId: 2,
    id: 16,
  },
  {
    label: 'Meitnerium',
    groupId: 2,
    id: 17,
  },
  {
    label: 'Darmstadtium',
    groupId: 2,
    id: 18,
  },
  {
    label: 'Roentgenium',
    groupId: 2,
    id: 19,
  },
  {
    label: 'Copernicium',
    groupId: 2,
    id: 20,
  },
  {
    label: 'Nihonium',
    groupId: 3,
    id: 21,
  },
  {
    label: 'Flerovium',
    groupId: 2,
    id: 22,
  },
  {
    label: 'Moscovium',
    groupId: 2,
    id: 23,
  },
  {
    label: 'Livermorium',
    groupId: 2,
    id: 24,
  },
  {
    label: 'Tennessine',
    groupId: 2,
    id: 25,
  },
  {
    label: 'Oganesson',
    groupId: 1,
    id: 26,
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

export const myGroup: MyGroup[] = ['Первая группа', 'Вторая группа', 'Третья группа'];

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
