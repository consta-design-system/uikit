import './ChoiceGroupExampleSize.css';

import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

const cnChoiceGroupExampleSize = cn('ChoiceGroupExampleSize');

export const ChoiceGroupExampleSize = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
          size="xs"
          className={cnChoiceGroupExampleSize()}
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
          size="s"
          className={cnChoiceGroupExampleSize()}
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
          size="m"
          className={cnChoiceGroupExampleSize()}
          name="ChoiceGroupExampleSize"
        />
      </div>
      <div>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
          size="l"
          className={cnChoiceGroupExampleSize()}
          name="ChoiceGroupExampleSize"
        />
      </div>
    </StoryBookExample>
  );
};
