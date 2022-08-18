import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { items } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleIsAccordion = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CollapseGroup items={items} isAccordion />
    </StoryBookExample>
  );
};
