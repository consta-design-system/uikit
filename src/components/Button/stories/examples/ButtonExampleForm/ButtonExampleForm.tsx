import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { TextField } from '../../../../TextField/TextField';
import { Button } from '../../../Button';

const cnExample = cn('Example');

export function ButtonExampleFormBasic() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Default" />
      </div>
      <div className={cnExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button form="brick" label="Brick" />
      </div>
      <div className={cnExample()}>
        <Button form="round" label="Round" />
      </div>
    </div>
  );
}

export function ButtonExampleFormHybrid() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample()}>
        <TextField placeholder="Электронная почта" form="roundClear" style={{ width: '260px' }} />
      </div>
      <div className={cnExample()}>
        <Button form="brickRound" label="Подписаться" />
      </div>
    </div>
  );
}
