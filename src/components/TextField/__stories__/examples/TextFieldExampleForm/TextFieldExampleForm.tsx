import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../../Button/Button';
import { TextField } from '../../../TextField';

export function TextFieldExampleFormBasic() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <TextField placeholder="Default" />
      </div>
      <div className={cnDocsExample(null, [wp.decorator({ 'indent-r': 's' })])}>
        <TextField form="brick" placeholder="Brick" />
      </div>
      <div className={cnDocsExample()}>
        <TextField form="round" placeholder="Round" />
      </div>
    </div>
  );
}

export function TextFieldExampleFormHybrid() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnDocsExample()}>
        <TextField placeholder="Электронная почта" form="roundClear" style={{ width: '260px' }} />
      </div>
      <div className={cnDocsExample()}>
        <Button form="brickRound" label="Подписаться" />
      </div>
    </div>
  );
}
