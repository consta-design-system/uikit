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
};

const items = [
  {
    name: 'один',
  },
  {
    name: 'два',
  },
  {
    name: 'три',
  },
  {
    name: 'четыре',
  },
  {
    name: 'пять',
  },
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

  const onChange = ({ value }: { value: Item | null }) => setValue(value);

  return (
    <div className={cnRadioGroupStories()}>
      <form>
        <RadioGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
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
  title: 'Components|/RadioGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
