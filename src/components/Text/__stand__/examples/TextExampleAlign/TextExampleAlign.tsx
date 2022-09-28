import './TextExampleAlign.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropAlign } from '../../../Text';

const cnTextExampleAlign = cn('TextExampleAlign');

export const TextExampleAlign = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col': 'gap_third', 'row': 'third' }),
        cnTextExampleAlign(),
      ])}
    >
      {textPropAlign.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text
            size="s"
            view="ghost"
            align={item}
            className={wp.decorator({ 'indent-b': 'xs' })}
          >
            {`align=&quot;${item}&quot;`}
          </Text>
          <Text align={item}>Просто текст</Text>
        </div>
      ))}
    </div>
  );
};
