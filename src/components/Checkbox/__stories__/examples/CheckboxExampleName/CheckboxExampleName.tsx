import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleName = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox
      onChange={() => console.log('onChange')}
      label="Это чекбокс"
      checked={false}
    />
  </StoryBookExample>
);
