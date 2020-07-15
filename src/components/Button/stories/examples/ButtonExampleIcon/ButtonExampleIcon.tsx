import React from 'react';

import { IconBackward } from '../../../../../icons/IconBackward/IconBackward';
import { IconCalendar } from '../../../../../icons/IconCalendar/IconCalendar';
import { IconFilter } from '../../../../../icons/IconFilter/IconFilter';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { IconHamburger } from '../../../../../icons/IconHamburger/IconHamburger';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnExample = cn('Example');

export function ButtonExampleIconBasic() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" iconLeft={IconBackward} />
      </div>
      <div className={cnExample()}>
        <Button label="Вперёд" iconRight={IconForward} />
      </div>
    </div>
  );
}

export function ButtonExampleIconOnly() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" view="ghost" iconLeft={IconHamburger} onlyIcon />
      </div>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" view="ghost" iconLeft={IconCalendar} onlyIcon />
      </div>
      <div className={cnExample()}>
        <Button label="Вперёд" view="ghost" iconRight={IconFilter} onlyIcon />
      </div>
    </div>
  );
}
