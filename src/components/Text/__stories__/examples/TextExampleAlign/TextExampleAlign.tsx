import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Text, TextPropAlign } from '../../../Text';

export const TextExampleAlign = () => {
  const align: Array<TextPropAlign> = ['left', 'center', 'right'];
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col': 'gap_third', 'row': 'third' }),
      ])}
    >
      {align.map((item, index) => (
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
