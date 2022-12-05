import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox
      onChange={() => console.log('onChange')}
      size="xs"
      label="Размер xs"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="s"
      label="Размер s"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="m"
      label="Размер m"
      checked={false}
    />
    <Checkbox
      onChange={() => console.log('onChange')}
      size="l"
      label="Размер l"
      checked={false}
    />
  </StoryBookExample>
);
