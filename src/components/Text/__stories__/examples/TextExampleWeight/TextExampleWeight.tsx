import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, TextPropWeight } from '../../../Text';

export const TextExampleWeight = () => {
  const weight: Array<TextPropWeight> = ['black', 'bold', 'semibold', 'regular', 'light', 'thin'];
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      {weight.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
            {`text*weight*${item}`}
          </Text>
          <Text size="l" weight={item}>
            Газпром нефть
          </Text>
        </div>
      ))}
    </div>
  );
};
