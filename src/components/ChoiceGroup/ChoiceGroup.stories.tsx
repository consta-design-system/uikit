import React, { useState } from 'react';
import { select, boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ChoiceGroup } from '../ChoiceGroup/ChoiceGroup';
import { IIcon } from '../Icon';
import { IconCamera } from '../Icon/icons/Camera';
import { IconCopy } from '../Icon/icons/Copy';

declare type Item = {
  name: string;
  icon?: React.FC<IIcon>;
};

const items = [
  {
    name: 'один',
    icon: IconCamera,
  },
  {
    name: 'два',
  },
  {
    name: 'три',
    icon: IconCopy,
  },
  {
    name: 'четыре',
    icon: IconCamera,
  },
];

const knobs = () => ({
  multiply: boolean('multiply', false),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  form: select('form', ['default', 'round', 'brick'], 'default'),
});

storiesOf('ChoiceGroup', module)
  .addDecorator(withKnobs)
  .add('Custom', () => {
    const [value, setValue] = useState<Item[] | null>(null);
    return (
      <ChoiceGroup<Item>
        {...knobs()}
        items={items}
        value={value}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        onChange={({ value }) => setValue(value)}
        getItemIcon={(item) => item.icon}
      />
    );
  });
