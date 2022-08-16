import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Checkbox } from '../../../Checkbox';

export const CheckboxExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Checkbox
      label="Checkbox"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      checked
      label="Checked"
      onChange={() => console.log('onChange')}
    />
    <Checkbox
      intermediate
      label="Intermediate"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      disabled
      label="Disabled"
      onChange={() => console.log('onChange')}
      checked={false}
    />
    <Checkbox
      disabled
      checked
      label="Disabled Checked"
      onChange={() => console.log('onChange')}
    />
  </StoryBookExample>
);
