import { ChipsPropStatus } from '##/components/ChipsCanary';

type Item = {
  text: string;
  color: ChipsPropStatus;
};

export const items: Item[] = [
  {
    text: 'Согласован',
    color: 'success',
  },
  {
    text: 'ожидает',
    color: 'warning',
  },
  {
    text: 'новый',
    color: 'normal',
  },
  {
    text: 'черновик',
    color: 'system',
  },
  {
    text: 'отказано',
    color: 'error',
  },
];

export const ChipsSimpleExample = () => {};
