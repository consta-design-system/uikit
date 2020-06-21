import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleSize1() {
  return (
    <div className={cnDocs('Section', ['tpl-grid tpl-grid_ratio_1-1-1-1 tpl-grid_col-gap_full'])}>
      <div className={cnExample()}>
        <Button label="Размер L" size="l" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер M" size="m" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер S" size="s" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер XS" size="xs" />
      </div>
    </div>
  );
}

export function ButtonExampleSize2() {
  return (
    <div className={cnDocs('Section')}>
      <div className={cnExample()}>
        <Button width="full" label="Отправить" />
      </div>
    </div>
  );
}
