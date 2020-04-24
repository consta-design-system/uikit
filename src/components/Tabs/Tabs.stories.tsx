import React, { Fragment, useState } from 'react';
import { select, withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IIcon } from '../../icons/Icon/Icon';
import { IconPhoto } from '../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../icons/IconRing/IconRing';
import { IconCamera } from '../../icons/IconCamera/IconCamera';
import { Tabs } from './Tabs';

declare type Item = {
  name?: string;
  icon?: IIcon;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Второй',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
];

function Stories({ size, view, onlyIcon, withIcon }) {
  const [value, setValue] = useState<Item[] | null>([
    {
      name: 'Второй',
      icon: <IconPhoto />,
    },
  ]);

  return (
    <Fragment>
      <Tabs<Item>
        items={items}
        value={value}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        getItemIcon={withIcon ? (item) => item.icon : null}
        onChange={({ value }) => setValue(value)}
        size={size}
        view={view}
        onlyIcon={onlyIcon}
      />
    </Fragment>
  );
}

const knobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Tabs', () => {
    return <Stories {...knobs()} />;
  });
