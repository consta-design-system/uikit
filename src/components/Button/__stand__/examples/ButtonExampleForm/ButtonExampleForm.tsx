import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { TextField } from '../../../../TextField/TextField';
import { Button } from '../../../Button';

export const ButtonExampleFormBasic = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
      ])}
    >
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button label="Default" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <Button form="brick" label="Brick" />
      </div>
      <div className={cnDocsExample()}>
        <Button form="round" label="Round" />
      </div>
    </div>
  );
};

export const ButtonExampleFormHybrid = () => {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.decorator({ distribute: 'left' }),
      ])}
    >
      <div className={cnDocsExample()}>
        <TextField
          placeholder="Электронная почта"
          form="roundClear"
          style={{ width: '100%', maxWidth: '260px' }}
        />
      </div>
      <div className={cnDocsExample()}>
        <Button form="brickRound" label="Подписаться" />
      </div>
    </div>
  );
};
