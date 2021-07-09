import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { Item, items } from '../__mocks__/data.mock';
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

import mdx from './RadioGroup.docs.mdx';

const cnRadioGroupStories = cn('RadioGroupStories');

const defaultKnobs = () => ({
  direction: select('direction', radioGroupDirections, radioGroupDefaultDirection),
  size: select('size', radioGroupSizes, radioGroupDefaultSize),
  view: select('view', radioGroupViews, radioGroupDefaultView),
  disabled: boolean('disabled', false),
  disabledItem: boolean('disabledItem', false),
});

export function Playground() {
  const [value, setValue] = React.useState<Item | null>(null);
  const { direction, size, view, disabled, disabledItem } = defaultKnobs();

  const onChange = ({ value }: { value: Item }) => setValue(value);

  return (
    <div className={cnRadioGroupStories()}>
      <form>
        <RadioGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={disabledItem ? (item) => item.disabled : undefined}
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
  title: 'Компоненты|/Базовые/RadioGroup',
  id: 'components/RadioGroup',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
