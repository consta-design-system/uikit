export type SimpleItem = string;

export const simpleItems: SimpleItem[] = [
  'Главное',
  'Важное',
  'Необязательное',
];

export type Item = {
  label: string;
  disabled?: boolean;
  completed?: boolean;
  skipped?: boolean;
};

export const items: Item[] = [
  {
    label: 'Главное',
    completed: true,
    skipped: true,
  },
  {
    label: 'Важное',
    disabled: true,
  },
  {
    label: 'Необязательное',
  },
];
