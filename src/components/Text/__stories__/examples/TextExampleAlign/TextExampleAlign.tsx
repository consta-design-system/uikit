import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropAlign } from '../../../Text';

export const TextExampleAlign = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col': 'gap_third', 'row': 'third' }),
      ])}
    >
      {textPropAlign.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text size="s" view="ghost" align={item} className={wp.decorator({ 'indent-b': 'xs' })}>
            {`text_align_${item}`}
          </Text>
          <Text align={item}>Газпром нефть</Text>
        </div>
      ))}
    </div>
  );
};
