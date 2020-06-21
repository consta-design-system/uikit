import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cn } from '../../../../../utils/bem';
import { TextField } from '../../../../TextField/TextField';
import { Button } from '../../../Button';

const cnDocs = cn('StoryBookRootDocsDecorator');
const cnExample = cn('Example');

export function ButtonExampleForm1() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button label="Default" />
      </div>
      <div className={cnExample(null, ['decorator decorator_indent-r_s'])}>
        <Button form="brick" label="Brick" />
      </div>
      <div className={cnExample()}>
        <Button form="round" label="Round" />
      </div>
    </div>
  );
}

export function ButtonExampleForm2() {
  return (
    <div className={cnDocs('Section', ['decorator decorator_distribute_left'])}>
      <div className={cnExample()}>
        <TextField placeholder="Электронная почта" form="roundClear" style={{ width: '260px' }} />
      </div>
      <div className={cnExample()}>
        <Button form="brickRound" label="Подписаться" />
      </div>
    </div>
  );
}
