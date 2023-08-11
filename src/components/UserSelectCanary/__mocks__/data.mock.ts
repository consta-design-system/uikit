export type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
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
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
    groupId: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
    groupId: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
    groupId: 1,
  },
  {
    label: 'Борис Борисов',
    subLabel: 'boris@mail.com',
    id: 4,
    groupId: 3,
  },
  {
    label: 'Кирилл Кириллов',
    subLabel: 'kirill@yandex.ru',
    id: 5,
    groupId: 1,
  },
  {
    label: 'Тимур Тумуров',
    subLabel: 'timur@gmail.com',
    id: 6,
    groupId: 2,
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

export type MyGroup = string;

export const myGroup: MyGroup[] = [
  'Первая группа',
  'Вторая группа',
  'Третья группа',
];

export type MyItem = {
  name: string;
  email?: string;
  avatarUrl?: string;
  group?: string | number;
  disabled?: boolean;
  position?: string;
};

export const myItems: MyItem[] = [
  {
    name: 'Андрей Андреев',
    email: 'andrey@gmail.com',
    avatarUrl: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
    group: myGroup[0],
    position: 'Дизайнер',
  },
  {
    name: 'Иван Иванов',
    email: 'ivan@gmail.com',
    avatarUrl: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
    group: myGroup[0],
    position: 'Дизайнер',
  },
  {
    name: 'Игор Игоров',
    email: 'igor@icloud.com',
    group: myGroup[1],
    position: 'Аналитик',
  },
  {
    name: 'Борис Борисов',
    email: 'boris@mail.com',
    avatarUrl: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
    group: myGroup[2],
    position: 'Программист',
  },
  {
    name: 'Кирилл Кириллов',
    email: 'kirill@yandex.ru',
    avatarUrl: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
    group: myGroup[2],
    position: 'Менеджер',
  },
  {
    name: 'Тимур Тумуров',
    email: 'timur@gmail.com',
    group: myGroup[1],
    position: 'Директор',
  },
];
