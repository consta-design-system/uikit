import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Text, TextPropSpacing } from '../../../Text';

export const TextExampleSpacing = () => {
  const spacing: Array<TextPropSpacing> = ['xs', 's', 'm', 'l'];
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      {spacing.map((item, index) => (
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
