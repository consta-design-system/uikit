import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleLoading1() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample()}>
        <Button loading label="Загрузка" />
      </div>
    </div>
  );
}
