import { IconBackward } from '@consta/icons/IconBackward';
import { IconCalendar } from '@consta/icons/IconCalendar';
import { IconFilter } from '@consta/icons/IconFilter';
import { IconForward } from '@consta/icons/IconForward';
import { IconHamburger } from '@consta/icons/IconHamburger';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Button } from '../../../Button';

export const ButtonExampleIconBasic = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
      ])}
    >
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" iconLeft={IconBackward} />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Вперёд" iconRight={IconForward} />
      </div>
    </div>
  );
};

export const ButtonExampleIconOnly = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
      ])}
    >
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" view="ghost" iconLeft={IconHamburger} onlyIcon />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Назад" view="ghost" iconLeft={IconCalendar} onlyIcon />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Вперёд" view="ghost" iconRight={IconFilter} onlyIcon />
      </div>
    </div>
  );
};
