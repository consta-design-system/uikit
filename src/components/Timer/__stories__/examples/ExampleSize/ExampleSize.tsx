import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Timer } from '../../../Timer';

export function ExampleSize() {
  return (
    <StoryBookExample>
      <Timer size="m" seconds={5} progress={80} />
      <Timer size="s" seconds={5} progress={80} />
    </StoryBookExample>
  );
}
