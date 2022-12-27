import { Example } from '@consta/stand';
import React from 'react';

import { IconBackward } from '##/icons/IconBackward';
import { IconCalendar } from '##/icons/IconCalendar';
import { IconFilter } from '##/icons/IconFilter';
import { IconForward } from '##/icons/IconForward';
import { IconHamburger } from '##/icons/IconHamburger';

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
