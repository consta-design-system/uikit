import React from 'react';

import { IconClose } from '../../../../../icons/IconClose/IconClose';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Tag } from '../../../Tag';

export const TagExampleMode = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Tag mode="button" label="Button" />
    <Tag mode="link" label="Link" />
    <Tag mode="check" label="Check" />
    <Tag mode="cancel" icon={IconClose} label="Cancel" />
  </StoryBookExample>
);
