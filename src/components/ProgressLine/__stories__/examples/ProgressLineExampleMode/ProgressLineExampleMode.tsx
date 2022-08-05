import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleMode = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnMixSpace({ mB: '2xl' })])}>
      <ProgressLine />
    </StoryBookExample>
  );
};

export const ProgressLineExampleModeValue = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnMixSpace({ mB: '2xl' })])}>
      <ProgressLine value={30} />
    </StoryBookExample>
  );
};

export const ProgressLineExampleModeSteps = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ProgressLine
        value={3}
        steps={['Первый', 'Второй', 'Третий']}
        getItemLabel={(item) => item}
      />
    </StoryBookExample>
  );
};
