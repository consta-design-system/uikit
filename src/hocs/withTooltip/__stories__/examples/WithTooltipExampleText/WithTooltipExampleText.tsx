import React from 'react';

import { Text } from '../../../../../components/Text/Text';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { withTooltip } from '../../../withTooltip';

const TextWithTooltip = withTooltip({ content: 'Тултип' })(Text);

export const WithTooltipExampleText = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <TextWithTooltip size="l" as="a" href="#" view="brand" decoration="underline">
        На мне появится тултип
      </TextWithTooltip>
    </div>
  );
};
