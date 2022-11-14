import './TextExampleView.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text, textPropView } from '../../../Text';

const cnTextExampleView = cn('TextExampleView');

export const TextExampleView = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'xs-columns': 3, 'col-gap': 'full', 'row-gap': 'full' }),
        cnTextExampleView(),
      ])}
    >
      {textPropView.map((item, index) => (
        <div key={index} className={wp.tplGrid('fraction', { row: 'third' })}>
          <Text
            size="s"
            view="ghost"
            className={wp.decorator({ 'indent-b': 'xs' })}
          >
            {`view="${item}"`}
          </Text>
          <Text size="l" view={item}>
            Просто текст
          </Text>
        </div>
      ))}
    </div>
  );
};
