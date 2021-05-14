import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  CheckboxGroup,
  checkboxGroupDefaultDirection,
  checkboxGroupDefaultSize,
  checkboxGroupDefaultView,
  checkboxGroupDirections,
  checkboxGroupSizes,
  checkboxGroupViews,
} from '../CheckboxGroup';

import mdx from './CheckboxGroup.docs.mdx';

const cnCheckboxGroupStories = cn('CheckboxGroupStories');

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три' },
  { name: 'disabled', disabled: true },
  { name: 'пять' },
];

const defaultKnobs = () => ({
  size: select('size', checkboxGroupSizes, checkboxGroupDefaultSize),
  view: select('view', checkboxGroupViews, checkboxGroupDefaultView),
  direction: select('direction', checkboxGroupDirections, checkboxGroupDefaultDirection),
  disabled: boolean('disabled', false),
});

export function Playground() {
  const [value, setValue] = React.useState<Item[] | null>(null);
  const { size, view, direction, disabled } = defaultKnobs();

  return (
    <div className={cnCheckboxGroupStories()}>
      <form>
        <CheckboxGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name={cnCheckboxGroupStories()}
          direction={direction}
          size={size}
          view={view}
          disabled={disabled}
        />
      </form>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/CheckboxGroup',
  id: 'components/CheckboxGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
