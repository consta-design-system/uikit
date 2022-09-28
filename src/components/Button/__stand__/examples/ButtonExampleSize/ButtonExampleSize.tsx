import './ButtonExampleSize.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnButtonExampleSize = cn('ButtonExampleSize');

export const ButtonExampleSizeBasic = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1-1-1', 'col-gap': 'full' }),
        cnButtonExampleSize(),
      ])}
    >
      <div className={cnDocsExample()}>
        <Button label="Размер XS" size="xs" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер S" size="s" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер M" size="m" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер L" size="l" />
      </div>
    </div>
  );
};

export const ButtonExampleSizeFull = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div className={cnDocsExample()}>
        <Button width="full" label="Отправить" />
      </div>
    </div>
  );
};
