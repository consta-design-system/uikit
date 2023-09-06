import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { ChipsChoice } from '##/components/ChipsCanary';
import { useDefaultGetter } from '##/utils/stand';

import { items } from '../../__mocks__/mock.data';
import {
  chipsPropActiveView,
  chipsPropActiveViewDefault,
  chipsPropSize,
  chipsPropSizeDefault,
} from '../../types';

export const ChipsChoiseVariants = () => {
  const size = useSelect('size', chipsPropSize, chipsPropSizeDefault);
  const multiple = useBoolean('multiple');
  const getItemStatus = useDefaultGetter('withStatus');
  const getItemIconLeft = useDefaultGetter(
    'withLeftIcon',
    false,
    !!getItemStatus,
  );
  const activeView = useSelect(
    'activeView',
    chipsPropActiveView,
    chipsPropActiveViewDefault,
  );

  const [value, setValue] = useState<typeof items[number] | null>(null);
  const [valueMultiple, setValueMultiple] = useState<typeof items | null>(null);

  if (multiple) {
    return (
      <ChipsChoice
        items={items}
        getItemStatus={getItemStatus}
        getItemIconLeft={getItemIconLeft}
        activeView={activeView}
        value={valueMultiple}
        onChange={setValueMultiple}
        size={size}
        multiple
      />
    );
  }

  return (
    <ChipsChoice
      items={items}
      getItemStatus={getItemStatus}
      getItemIconLeft={getItemIconLeft}
      activeView={activeView}
      value={value}
      onChange={setValue}
      size={size}
    />
  );
};
