import { StepsItemDefault } from '../types';

export type SimpleItem = string;

export const simpleItems: SimpleItem[] = [
  'Главное',
  'Важное',
  'Необязательное',
];

export const items: StepsItemDefault[] = [
  {
    label: 'Главное',
  },
  {
    label: 'Важное',
    disabled: true,
  },
  {
    label: 'Необязательное',
  },
];
