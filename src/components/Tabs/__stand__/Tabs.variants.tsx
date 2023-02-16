import './Tabs.variants.css';

import { IconCamera } from '@consta/icons/IconCamera';
import { IconPhone } from '@consta/icons/IconPhone';
import { IconPhoto } from '@consta/icons/IconPhoto';
import { IconRing } from '@consta/icons/IconRing';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { cn } from '##/utils/bem';

import {
  Tabs,
  tabsDefaultFitMode,
  tabsDefaultLinePosition,
  tabsDefaultSize,
  tabsDefaultView,
  tabsFitModes,
  TabsItemDefault,
  tabsLinePositions,
  tabsSizes,
  tabsViews,
} from '../Tabs';

const cnTabsVariants = cn('TabsVariants');

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const Side = ({ disabled }: { disabled?: boolean }) => (
  <Badge
    className={cnTabsVariants('Badge', { disabled })}
    size="s"
    status="system"
    label="Badge"
  />
);

const getConditionalGetterSide = (
  conditional: boolean,
  disabledAll: boolean,
  withDisabledItems: boolean,
) =>
  conditional
    ? (item: TabsItemDefault) => (
        <Side disabled={disabledAll || (withDisabledItems && item.disabled)} />
      )
    : getUndefined;

const items: TabsItemDefault[] = [
  {
    label: 'Первый вариант',
    disabled: false,
    leftIcon: IconPhoto,
    rightIcon: IconPhoto,
  },
  {
    label: 'Второй вариант',
    disabled: true,
    leftIcon: IconCamera,
    rightIcon: IconCamera,
  },
  {
    label: 'Третий вариант',
    disabled: false,
    leftIcon: IconPhone,
    rightIcon: IconPhone,
  },
  {
    label: 'Четвёртый вариант',
    disabled: true,
    leftIcon: IconRing,
    rightIcon: IconRing,
  },
];

const Variants = () => {
  const size = useSelect('size', tabsSizes, tabsDefaultSize);
  const view = useSelect('view', tabsViews, tabsDefaultView);
  const linePosition = useSelect(
    'linePosition',
    tabsLinePositions,
    tabsDefaultLinePosition,
  );
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const onlyIcon = useBoolean(
    'onlyIcon',
    false,
    Boolean(withLeftIcon || withRightIcon),
  );
  const withLeftSide = useBoolean('withLeftSide', false);
  const withRightSide = useBoolean('withRightSide', false);
  const disabledItems = useBoolean('disabledItems', false);
  const disabledAll = useBoolean('disabledAll', false);
  const fitMode = useSelect(
    'fitMode',
    tabsFitModes,
    tabsDefaultFitMode,
    Boolean(linePosition === 'bottom' || linePosition === 'top'),
  );

  const [value, setValue] = useState<TabsItemDefault | null>(items[0]);

  return (
    <Tabs
      items={items}
      value={value}
      getItemLeftIcon={conditionalGetter(withLeftIcon)}
      getItemRightIcon={conditionalGetter(withRightIcon)}
      getItemLeftSide={getConditionalGetterSide(
        withLeftSide,
        disabledAll,
        disabledItems,
      )}
      getItemRightSide={getConditionalGetterSide(
        withRightSide,
        disabledAll,
        disabledItems,
      )}
      getItemDisabled={conditionalGetter(disabledItems)}
      onChange={({ value }) => setValue(value)}
      size={size}
      view={view}
      linePosition={linePosition as 'bottom' | 'top'}
      fitMode={fitMode}
      onlyIcon={onlyIcon}
      disabled={disabledAll}
    />
  );
};

export default Variants;
