import './TextExampleWeight.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, TextPropWeight } from '../../../Text';

const cnTextExampleWeight = cn('TextExampleWeight');

export const TextExampleWeight = () => {
  const weight: Array<TextPropWeight> = [
    'black',
    'bold',
    'semibold',
    'regular',
    'light',
    'thin',
  ];
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' }),
        cnTextExampleWeight(),
      ])}
    >
      {weight.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text
            size="s"
            view="ghost"
            className={wp.decorator({ 'indent-b': 'xs' })}
          >
            {`weight=&quot;${item}&quot;`}
          </Text>
          <Text size="l" weight={item}>
            Просто текст
          </Text>
        </div>
      ))}
    </div>
  );
};
