import React, { Fragment, useState } from 'react';
import { select, withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IIcon } from '../../icons/Icon/Icon';
import { IconPhoto } from '../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../icons/IconRing/IconRing';
import { IconCamera } from '../../icons/IconCamera/IconCamera';

import { Tabs } from './Tabs';

declare type Item = string;
declare type Item2 = {
  name?: string;
  icon?: IIcon;
};

const items = ['Один', 'Два', 'Три'];
const items2 = [
  {
    name: 'Один',
    icon: IconPhoto,
  },
  {
    name: 'Два',
    icon: IconRing,
  },
  {
    name: 'Три',
    icon: IconCamera,
  },
];

const knobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  onlyIcon: boolean('onlyIcon', false),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Tabs', () => {
    const [value, setValue] = useState<Item[] | null>(['Один']);
    const [value2, setValue2] = useState<Item2[] | null>([
      {
        name: 'Два',
        icon: <IconPhoto />,
      },
    ]);

    return (
      <Fragment>
        <Tabs<Item>
          {...knobs()}
          items={items}
          value={value}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          onChange={({ value }) => setValue(value)}
        />
        <Tabs<Item2>
          {...knobs()}
          items={items2}
          value={value2}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          onChange={({ value }) => setValue2(value)}
        />
      </Fragment>
    );
  });
