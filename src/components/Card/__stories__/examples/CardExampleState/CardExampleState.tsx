import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Card } from '../../../Card';

export const CardExampleState = () => {
  return (
    <StoryBookExample>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="alert">
        <Text>Опасная карточка</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="warning">
        <Text>Тревожная карточка</Text>
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl" status="success">
        <Text>Успешная карточка</Text>
      </Card>
    </StoryBookExample>
  );
};
