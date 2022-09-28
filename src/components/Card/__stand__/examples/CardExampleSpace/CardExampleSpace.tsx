import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { Card, cardPropSpace } from '../../../Card';

export const CardExampleSpace = () => {
  return (
    <StoryBookExample>
      {cardPropSpace.map((item) => (
        <Card verticalSpace={item} horizontalSpace={item}>
          <Text>{`Отступы '${item}'`}</Text>
        </Card>
      ))}
    </StoryBookExample>
  );
};
