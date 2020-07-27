import React from 'react';

import { IconCheck } from '../../../../../icons/IconCheck/IconCheck';
import { IconClose } from '../../../../../icons/IconClose/IconClose';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleIcon = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge icon={IconCheck} status="success" label="Съедобно" />
    <Badge icon={IconClose} status="error" label="Отрава" />
  </StoryBookExample>
);
