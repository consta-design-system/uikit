export type Item = {
  name: string;
  disabled?: boolean;
};

export const items: Item[] = [
  { name: 'Один' },
  { name: 'Два' },
  { name: 'Три' },
  { name: 'Четыре', disabled: true },
  { name: 'Пять' },
];

export const itemsHead: Item[] = [
  { name: 'Тумбочка' },
  { name: 'Банк' },
  { name: 'Матрас' },
];

export const itemsHead2: Item[] = [
  { name: 'В тумбочке' },
  { name: 'В банке' },
  { name: 'Под матрасом' },
];

export const itemsNeg: Item[] = [
  { name: 'Hе хочу больше этих ваших дурацких булок' },
];

export const itemsNeg2: Item[] = [
  { name: 'Съесть ещё этих мягких французских булок' },
];

export const itemsGen: Item[] = [
  { name: 'Этих' },
  { name: 'Мягких' },
  { name: 'Сладких' },
  { name: 'Французских' },
  { name: 'Никаких' },
];

export const itemsGen2: Item[] = [
  { name: 'Этих' },
  { name: 'Мягких' },
  { name: 'Сладких' },
  { name: 'Французских' },
];
