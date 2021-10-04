import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleForm = () => {
  return (
    <StoryBookExample>
      <Card verticalSpace="2xl" horizontalSpace="2xl" form="round">
        <Text>Круглая карточка</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" form="square">
        <Text>Квадратная карточка</Text>
      </Card>
    </StoryBookExample>
  );
};
