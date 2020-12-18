import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  RadioGroup,
  radioGroupDefaultDirection,
  radioGroupDefaultSize,
  radioGroupDefaultView,
  radioGroupDirections,
  radioGroupSizes,
  radioGroupViews,
} from '../RadioGroup';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './RadioGroup.mdx';

const cnRadioGroupStories = cn('RadioGroupStories');

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три' },
  { name: 'четыре' },
  { name: 'пять disabled', disabled: true },
];

const defaultKnobs = () => ({
  direction: select('direction', radioGroupDirections, radioGroupDefaultDirection),
  size: select('size', radioGroupSizes, radioGroupDefaultSize),
  view: select('view', radioGroupViews, radioGroupDefaultView),
  disabled: boolean('disabled', false),
});

export function Playground() {
  const [value, setValue] = React.useState<Item | null>(null);
  const { direction, size, view, disabled } = defaultKnobs();

  const onChange = ({ value }: { value: Item }) => setValue(value);

  return (
    <div className={cnRadioGroupStories()}>
      <form>
        <RadioGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
          onChange={onChange}
          name={cnRadioGroupStories()}
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
  title: 'Компоненты|/RadioGroup',
  id: 'components/RadioGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
