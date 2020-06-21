import React from 'react';

import { IconBackward } from '../../../../../icons/IconBackward/IconBackward';
import { IconCalendar } from '../../../../../icons/IconCalendar/IconCalendar';
import { IconFilter } from '../../../../../icons/IconFilter/IconFilter';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { IconHamburger } from '../../../../../icons/IconHamburger/IconHamburger';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleIcon1() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button label="Назад" iconLeft={IconBackward} />
      </div>
      <div className={cnExample()}>
        <Button label="Вперёд" iconRight={IconForward} />
      </div>
    </div>
  );
}

export function ButtonExampleIcon2() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_xs'])}>
        <Button label="Назад" view="ghost" iconLeft={IconHamburger} onlyIcon />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_xs'])}>
        <Button label="Назад" view="ghost" iconLeft={IconCalendar} onlyIcon />
      </div>
      <div className={cnExample()}>
        <Button label="Вперёд" view="ghost" iconRight={IconFilter} onlyIcon />
      </div>
    </div>
  );
}
