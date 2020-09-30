import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropSpacing } from '../../../Text';

export const TextExampleSpacing = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      {textPropSpacing.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
            {`text*spacing*${item}`}
          </Text>
          <Text spacing={item}>
            «Газпром нефть» ведет работу в крупнейших российских нефтегазовых регионах.
          </Text>
        </div>
      ))}
    </div>
  );
};
