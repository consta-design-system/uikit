import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Text } from '../../../../Text/Text';
import { FileField } from '../../../FileField';

export function FileFieldExampleWithoutRenderProp() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <FileField id="FileFieldExampleWithoutRenderProp">
        <Text>Нажми на меня</Text>
      </FileField>
    </div>
  );
}
