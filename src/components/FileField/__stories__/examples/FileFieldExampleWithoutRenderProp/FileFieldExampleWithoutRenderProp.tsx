import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { FileField } from '../../../FileField';

export function FileFieldExampleWithoutRenderProp() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderProp">
        <Text>Нажми на меня</Text>
      </FileField>
    </StoryBookExample>
  );
}
