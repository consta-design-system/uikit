import React, { useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { IconProps } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconPhone } from '../../../icons/IconPhone/IconPhone';
import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../../icons/IconRing/IconRing';
import { createMetadata } from '../../../utils/storybook';
import {
  Tabs,
  tabsDefaultFitMode,
  tabsDefaultLinePosition,
  tabsDefaultSize,
  tabsDefaultView,
  tabsFitModes,
  tabsLinePositions,
  tabsSizes,
  tabsViews,
} from '../Tabs';

import mdx from './Tabs.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', tabsSizes, tabsDefaultSize),
  view: select('view', tabsViews, tabsDefaultView),
  linePosition: select('linePosition', tabsLinePositions, tabsDefaultLinePosition),
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
  {
    name: 'Четвёртый вариант',
    icon: IconPhone,
  },
];

export function Playground() {
  const { size, view, linePosition, withIcon, onlyIcon } = defaultKnobs();

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
      {...(linePosition === 'bottom' || linePosition === 'top'
        ? {
            linePosition,
            fitMode: select('fitMode', tabsFitModes, tabsDefaultFitMode),
          }
        : {
            linePosition,
          })}
      onlyIcon={onlyIcon}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Навигация/Tabs',
  id: 'components/Tabs',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=12745%3A116509',
    },
  },
});
