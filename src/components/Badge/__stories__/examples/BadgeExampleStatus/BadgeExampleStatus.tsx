import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleStatus = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge status="normal" label="Новый" />
    <Badge status="success" label="Сойдёт" />
    <Badge status="error" label="Отстой" />
    <Badge status="warning" label="На проверке" />
    <Badge status="system" label="Черновик" />
  </StoryBookExample>
);
