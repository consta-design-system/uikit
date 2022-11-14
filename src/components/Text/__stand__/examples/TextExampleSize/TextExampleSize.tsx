import './TextExampleSize.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropSize } from '../../../Text';

const cnTextExampleSize = cn('TextExampleSize');

export const TextExampleSize = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
        cnTextExampleSize(),
      ])}
    >
      {textPropSize.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text
            size="s"
            view="ghost"
            className={wp.decorator({ 'indent-b': 'm' })}
          >
            {`size="${item}"`}
          </Text>
          <Text size={item}>Просто текст</Text>
        </div>
      ))}
    </div>
  );
};
