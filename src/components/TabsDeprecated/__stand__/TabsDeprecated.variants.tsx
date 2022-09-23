import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconPhone } from '../../../icons/IconPhone/IconPhone';
import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import { IconRing } from '../../../icons/IconRing/IconRing';
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
} from '../TabsDeprecated';

const Variants = () => {
  const size = useSelect('size', tabsSizes, tabsDefaultSize);
  const view = useSelect('view', tabsViews, tabsDefaultView);
  const linePosition = useSelect(
    'linePosition',
    tabsLinePositions,
    tabsDefaultLinePosition,
  );
  const withIcon = useBoolean('withIcon', false);
  const onlyIcon = useBoolean('onlyIcon', false, Boolean(withIcon));
  const fitMode = useSelect(
    'fitMode',
    tabsFitModes,
    tabsDefaultFitMode,
    Boolean(linePosition === 'bottom' || linePosition === 'top'),
  );

  type Item = {
    name: string;
    icon?: IconComponent;
  };

  const itemIcons = [IconPhoto, IconRing, IconCamera, IconPhone];

  const getItems = (): Item[] => {
    const variantsItems = [
      {
        name: 'Первый',
      },
      {
        name: 'Очень длинный второй вариант',
      },
      {
        name: 'Третий вариант',
      },
      {
        name: 'Четвёртый вариант',
      },
    ];

    return variantsItems.map((item, idx) => ({
      ...item,
      icon: itemIcons[idx % itemIcons.length],
    }));
  };

  const items = getItems();
  const [value, setValue] = useState<Item | null>(items[0]);

  return (
    <Tabs
      items={items}
      value={value}
      getLabel={(item) => item.name}
      getIcon={(item) => (withIcon ? item.icon : undefined)}
      onChange={({ value }) => setValue(value)}
      size={size}
      view={view}
      linePosition={linePosition as 'bottom' | 'top'}
      fitMode={fitMode}
      onlyIcon={onlyIcon}
    />
  );
};

export default Variants;
