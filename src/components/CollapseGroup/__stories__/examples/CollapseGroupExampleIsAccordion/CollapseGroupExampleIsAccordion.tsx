import React from 'react';

import { items } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleIsAccordion = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CollapseGroup items={items} isAccordion />
    </StoryBookExample>
  );
};
