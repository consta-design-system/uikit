import { IconAdd } from '@consta/icons/IconAdd';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { FileField } from '../../../FileField';

export const FileFieldExampleWithoutRenderProp = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderProp">
        <Text>Нажми меня</Text>
      </FileField>
    </StoryBookExample>
  );
};

export const FileFieldExampleWithoutRenderPropIcon = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderPropIcon">
        <IconAdd view="alert" />
      </FileField>
    </StoryBookExample>
  );
};
