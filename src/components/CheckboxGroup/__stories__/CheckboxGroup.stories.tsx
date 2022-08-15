import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';

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
  direction: select(
    'direction',
    checkboxGroupDirections,
    checkboxGroupDefaultDirection,
  ),
  disabled: boolean('disabled', false),
});

export const Playground = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);
  const { size, view, direction, disabled } = defaultKnobs();

  return (
    <div className={cnCheckboxGroupStories()}>
      <form>
        <CheckboxGroup
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
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
};

export default createMetadata({
  title: 'Компоненты|/Базовые/CheckboxGroup(Canary)',
  id: 'components/CheckboxGroupCanary',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=56%3A37365',
    },
  },
});
