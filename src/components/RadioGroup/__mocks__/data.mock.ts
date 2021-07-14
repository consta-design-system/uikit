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
    name: 'два',
  },
  {
    name: 'три',
  },
  {
    name: 'четыре',
  },
  {
    name: 'пять',
    disabled: true,
  },
];
