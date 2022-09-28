import './CheckboxGroupExampleSize.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

const cnCheckboxGroupExampleSize = cn('CheckboxGroupExampleSize');

export const CheckboxGroupExampleSize = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
        direction="row"
        size="m"
        className={cnCheckboxGroupExampleSize()}
      />
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
        direction="row"
        size="l"
        className={cnCheckboxGroupExampleSize()}
      />
    </StoryBookExample>
  );
};
