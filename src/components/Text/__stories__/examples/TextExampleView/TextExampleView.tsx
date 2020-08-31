import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Text, TextPropView } from '../../../Text';

export const TextExampleView = () => {
  const view: Array<TextPropView> = [
    'alert',
    'brand',
    'ghost',
    'link',
    'link-minor',
    'primary',
    'secondary',
    'success',
    'warning',
  ];
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      {view.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'xs' })}>
            {`text*view*${item}`}
          </Text>
          <Text size="l" view={item}>
            Газпром нефть
          </Text>
        </div>
      ))}
    </div>
  );
};
