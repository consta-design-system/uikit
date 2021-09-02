export const simpleItems = ['один', 'два', 'три', 'четыре', 'пять'];

export type Item = {
  name: string;
  disabled?: boolean;
};

export const items: Item[] = [
  {
    name: 'один',
  },
  {
    name: `очень длинный текст для второго пункта`,
  },
  {
    name: 'три',
  },
  {
    name: 'очень длинный текст для четвертого пункта',
  },
  {
    name: 'пять',
    disabled: true,
  },
];
