import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropLineHeight } from '../../../Text';

export const TextExampleLineheight = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 2, 'col-gap': 'full', 'row-gap': 'full' }),
      ])}
    >
      {textPropLineHeight.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text
            size="s"
            view="ghost"
            className={wp.decorator({ 'indent-b': 'xs' })}
          >
            {`line-height=&quot;${item}&quot;`}
          </Text>
          <Text lineHeight={item}>
            Съешь ещё этих мягких французских булок, да выпей же чаю.
          </Text>
        </div>
      ))}
    </div>
  );
};
