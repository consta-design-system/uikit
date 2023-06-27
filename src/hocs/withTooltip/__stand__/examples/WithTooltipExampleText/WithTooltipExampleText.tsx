import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text/Text';

import { withTooltip } from '../../../withTooltip';

const TextWithTooltip = withTooltip({ content: 'Тултип' })(Text);

export const WithTooltipExampleText = () => {
  return (
    <Example>
      <TextWithTooltip size="l" as="a" view="brand" decoration="underline">
        На мне появится тултип
      </TextWithTooltip>
    </Example>
  );
};
