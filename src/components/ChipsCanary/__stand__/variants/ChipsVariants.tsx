import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { Chips } from '##/components/ChipsCanary';
import { useDefaultGetter } from '##/utils/stand';

import { items } from '../../__mocks__/mock.data';
import {
  chipsPropActiveView,
  chipsPropActiveViewDefault,
  chipsPropSize,
  chipsPropSizeDefault,
} from '../../types';

export const ChipsVariants = () => {
  const size = useSelect('size', chipsPropSize, chipsPropSizeDefault);
  const getItemStatus = useDefaultGetter('withStatus');
  const getItemIconLeft = useDefaultGetter(
    'withLeftIcon',
    false,
    !!getItemStatus,
  );
  const getItemIconRight = useDefaultGetter('withRightIcon');
  const getItemActive = useDefaultGetter('withActive');
  const activeView = useSelect(
    'activeView',
    chipsPropActiveView,
    chipsPropActiveViewDefault,
    !getItemActive,
  );
  const interactive = useBoolean('interactive');

  return (
    <Chips
      items={items}
      getItemStatus={getItemStatus}
      getItemIconLeft={getItemIconLeft}
      getItemIconRight={getItemIconRight}
      getItemActive={getItemActive}
      activeView={activeView}
      size={size}
      interactive={interactive}
    />
  );
};
