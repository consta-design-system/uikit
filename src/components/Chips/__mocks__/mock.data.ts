import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';

import { ChipsDefaultItem } from '..';

export const items: ChipsDefaultItem[] = [
  {
    label: 'Python',
    status: 'success',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    active: false,
    disabled: true,
  },
  {
    label: 'JavaScript',
    status: 'warning',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    active: true,
  },
  {
    label: 'C#',
    status: 'normal',
    iconLeft: IconDinosaur,
    iconRight: IconClose,
    active: false,
  },
];
