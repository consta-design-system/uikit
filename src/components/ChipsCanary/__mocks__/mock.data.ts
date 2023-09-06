import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';

import { ChipsDefaultItem } from '..';

const onRightIconClick = () => alert('Кликнул по крестику');

export const items: ChipsDefaultItem[] = [
  {
    label: 'Python',
    status: 'success',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    onRightIconClick,
    active: false,
  },
  {
    label: 'JavaScript',
    status: 'warning',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    onRightIconClick,
    active: true,
  },
  {
    label: 'C#',
    status: 'normal',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    onRightIconClick,
    active: false,
  },
];
