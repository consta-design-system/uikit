import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { simpleItems, simpleItems2 } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

export const CollapseGroupExampleSimple = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CollapseGroup items={simpleItems} />
    </StoryBookExample>
  );
};

export const CollapseGroupExampleSimple2 = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CollapseGroup items={simpleItems2} />
    </StoryBookExample>
  );
};
