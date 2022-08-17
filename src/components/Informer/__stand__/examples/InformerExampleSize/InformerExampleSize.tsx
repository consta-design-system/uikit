import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Informer } from '../../../Informer';

export const InformerExampleSize = () => (
  <div>
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Informer
        status="system"
        view="filled"
        title="Размер m"
        label="Это обычное сообщение, и размер обычный"
        size="m"
      />
      <Informer
        status="system"
        view="filled"
        title="Размер s"
        label="Это сообщение поменьше"
        size="s"
      />
    </StoryBookExample>
  </div>
);
