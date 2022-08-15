import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleMode = () => {
  const [checked, setChecked] = useState(false);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Tag onClick={() => {}} mode="button" label="Button" />
      <Tag mode="link" label="Link" href="#" />
      <Tag
        mode="check"
        onChange={({ checked }) => setChecked(checked)}
        label="Check"
        checked={checked}
      />
      <Tag onCancel={() => {}} mode="cancel" label="Cancel" />
    </StoryBookExample>
  );
};
