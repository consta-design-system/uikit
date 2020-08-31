import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../../Button/Button';
import { TextField } from '../../../TextField';

export const TextFieldExampleFormBasic = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <TextField placeholder="Default" />
    <TextField form="brick" placeholder="Brick" />
    <TextField form="round" placeholder="Round" />
  </StoryBookExample>
);

export function TextFieldExampleFormHybrid() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div>
        <TextField placeholder="Электронная почта" form="roundClear" style={{ width: '260px' }} />
      </div>
      <div>
        <Button form="brickRound" label="Подписаться" />
      </div>
    </div>
  );
}
