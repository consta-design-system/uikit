import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../Button';

export const ButtonExampleAdaptive = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      {[200, 150, 50].map((width) => (
        <div key={width} style={{ width }}>
          <Button label="Этот текст не помещается" />
        </div>
      ))}
    </StoryBookExample>
  );
};
