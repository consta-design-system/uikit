import { IconBackward } from '@consta/icons/IconBackward';
import { IconCalendar } from '@consta/icons/IconCalendar';
import { IconFilter } from '@consta/icons/IconFilter';
import { IconForward } from '@consta/icons/IconForward';
import { IconHamburger } from '@consta/icons/IconHamburger';
import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../Button';

export const ButtonExampleIconBasic = () => {
  return (
    <Example>
      <Button label="Назад" iconLeft={IconBackward} />
      <Button label="Вперёд" iconRight={IconForward} />
    </Example>
  );
};

export const ButtonExampleIconOnly = () => {
  return (
    <Example>
      <Button label="Назад" view="ghost" iconLeft={IconHamburger} onlyIcon />
      <Button label="Назад" view="ghost" iconLeft={IconCalendar} onlyIcon />
      <Button label="Вперёд" view="ghost" iconRight={IconFilter} onlyIcon />
    </Example>
  );
};
