import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Item, items } from '../__mocks__/data.mock';
import {
  RadioGroup,
  radioGroupDefaultDirection,
  radioGroupDefaultSize,
  radioGroupDefaultView,
  radioGroupDirections,
  radioGroupPropAlign,
  radioGroupPropAlignDefault,
  radioGroupSizes,
  radioGroupViews,
} from '../RadioGroupCannary';
import mdx from './RadioGroup.docs.mdx';

const cnRadioGroupStories = cn('RadioGroupStories');

const defaultKnobs = () => ({
  direction: select(
    'direction',
    radioGroupDirections,
    radioGroupDefaultDirection,
  ),
  size: select('size', radioGroupSizes, radioGroupDefaultSize),
  view: select('view', radioGroupViews, radioGroupDefaultView),
  disabled: boolean('disabled', false),
  disabledItem: boolean('disabledItem', false),
  align: select('align', radioGroupPropAlign, radioGroupPropAlignDefault),
});

export const Playground = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const { direction, size, view, disabled, disabledItem, align } =
    defaultKnobs();

  const onChange = ({ value }: { value: Item }) => setValue(value);

  return (
    <div className={cnRadioGroupStories()}>
      <form>
        <RadioGroup
          align={align}
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={disabledItem ? (item) => item.disabled : undefined}
          onChange={onChange}
          name={cnRadioGroupStories()}
          direction={direction}
          size={size}
          view={view}
          disabled={disabled}
          style={{
            width: '300px',
          }}
        />
      </form>
    </div>
  );
};

export default createMetadata({
  title: 'Компоненты|/Базовые/RadioGroup(Canary)',
  id: 'components/RadioGroupCanary',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=57%3A1655',
    },
  },
});
