import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Tag } from '../../../../Tag/Tag';
import { Text } from '../../../../Text/Text';
import { Badge } from '../../../Badge';

export const BadgeExampleUse = () => (
  <div>
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'xs-columns': 3, 'row-gap': 'full' })])}
    >
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Text weight="bold">Первый ноутбук</Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Badge label="В наличии" size="s" status="success" />
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Tag
          mode="button"
          onClick={() => console.log('onClick')}
          label="Мощный"
          group="1"
          size="s"
          className={wp.decorator({ 'indent-r': 'xs', 'indent-b': 's' })}
        />
        <Tag
          mode="button"
          onClick={() => console.log('onClick')}
          label="Игровой"
          group="1"
          size="s"
        />
      </div>
    </div>
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'xs-columns': 3, 'row-gap': 'full' })])}
    >
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Text weight="bold">Второй ноутбук</Text>
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Badge label="Ожидается" size="s" status="system" />
      </div>
      <div className={wp.tplGrid('fraction', { row: 'first' })}>
        <Tag
          mode="button"
          onClick={() => console.log('onClick')}
          label="Красивый"
          group="1"
          size="s"
          className={wp.decorator({ 'indent-r': 'xs', 'indent-b': 'xl' })}
        />
      </div>
    </div>
  </div>
);
