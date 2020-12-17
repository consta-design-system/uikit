import React, { useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../../icons/IconRing/IconRing';
import { createMetadata } from '../../../utils/storybook';
import { Tabs } from '../Tabs';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Tabs.mdx';

const defaultKnobs = () => ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

type Item = {
  name: string;
  icon?: React.FC<IconProps>;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Очень длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
];

export function Playground() {
  const { size, view, withIcon, onlyIcon } = defaultKnobs();

  const [value, setValue] = useState<Item | null>(items[0]);

  return (
    <Tabs
      items={items}
      value={value}
      getLabel={(item) => item.name}
      getIcon={withIcon ? (item) => item.icon : undefined}
      onChange={({ value }) => setValue(value)}
      size={size}
      view={view}
      onlyIcon={onlyIcon}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Tabs',
  id: 'components/Tabs',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
