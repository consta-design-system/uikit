import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleShadow = () => {
  return (
    <StoryBookExample>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
        <Text>Карточка с тенью</Text>
      </Card>
      <Card
        verticalSpace="2xl"
        horizontalSpace="2xl"
        status="success"
        shadow={false}
      >
        <Text>Карточка без тени</Text>
      </Card>
    </StoryBookExample>
  );
};
