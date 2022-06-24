import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleBorder = () => {
  return (
    <StoryBookExample>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success" shadow={false} border>
        <Text>Карточка с границей</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success" shadow={false}>
        <Text>Карточка без границы</Text>
      </Card>
    </StoryBookExample>
  );
};
