import React from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { FileField } from '../../../FileField';

export function FileFieldExampleWithoutRenderProp() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderProp">
        <Text>Нажми меня</Text>
      </FileField>
    </StoryBookExample>
  );
}

export function FileFieldExampleWithoutRenderPropIcon() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderPropIcon">
        <IconAdd view="alert" />
      </FileField>
    </StoryBookExample>
  );
}
