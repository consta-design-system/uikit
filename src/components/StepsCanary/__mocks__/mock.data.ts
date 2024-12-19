export type SimpleItem = string;

export const simpleItems: SimpleItem[] = [
  'Главное',
  'Важное',
  'Необязательное',
];

export type Item = {
  label: string;
  disabled?: boolean;
  finish?: boolean;
  skip?: boolean;
};

export const items: Item[] = [
  {
    label: 'Главное',
    finish: true,
    skip: true,
  },
  {
    label: 'Важное',
    disabled: true,
  },
  {
    label: 'Необязательное',
  },
];
