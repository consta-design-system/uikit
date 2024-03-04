import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { badgePropStatus } from '##/components/Badge';
import { ChipsItem } from '##/components/Chips';

import {
  chipsPropActiveView,
  chipsPropActiveViewDefault,
  chipsPropSize,
  chipsPropSizeDefault,
} from '../../types';

export const ChipsItemVariant = () => {
  const label = useText('label', 'Label') || '';
  const size = useSelect('size', chipsPropSize, chipsPropSizeDefault);
  const status = useSelect('status', badgePropStatus);
  const iconRight = useBoolean('iconRight') ? IconClose : undefined;
  const iconLeft = useBoolean('iconLeft', false, !status)
    ? IconDinosaur
    : undefined;

  const active = useBoolean('active');
  const activeView = useSelect(
    'activeView',
    chipsPropActiveView,
    chipsPropActiveViewDefault,
    active,
  );
  const interactive = useBoolean('interactive');
  const disabled = useBoolean('disabled');

  return (
    <ChipsItem
      iconRight={iconRight}
      iconLeft={iconLeft}
      active={active}
      activeView={activeView}
      interactive={interactive}
      size={size}
      label={label}
      status={status}
      disabled={disabled}
    />
  );
};
