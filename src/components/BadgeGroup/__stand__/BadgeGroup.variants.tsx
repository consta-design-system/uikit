import { IconAlert } from '@consta/icons/IconAlert';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconInfo } from '@consta/icons/IconInfo';
import { IconQuestion } from '@consta/icons/IconQuestion';
import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { IconWarning } from '##/icons/IconWarning';

import {
  badgePropForm,
  badgePropFormDefault,
  badgePropSize,
  badgePropSizeDefault,
} from '../../Badge';
import { BadgeGroup, BadgeGroupDefaultItem } from '../BadgeGroup';

const badges: BadgeGroupDefaultItem[] = [
  {
    key: '1',
    iconLeft: IconCheck,
    iconRight: IconAlert,
    label: 'Согласован',
    status: 'success',
  },
  {
    key: '2',
    iconLeft: IconQuestion,
    iconRight: IconAlert,
    label: 'ожидает',
    status: 'warning',
  },
  {
    key: '3',
    iconLeft: IconInfo,
    iconRight: IconAlert,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
  },
  {
    key: '4',
    iconLeft: IconEdit,
    iconRight: IconAlert,
    label: 'черновик',
    status: 'system',
  },
  {
    key: '5',
    iconLeft: IconWarning,
    iconRight: IconAlert,
    label: 'отказано',
    view: 'stroked',
    status: 'error',
  },
];

const Variants = () => {
  const minified = useBoolean('minified', false);
  const size = useSelect('size', badgePropSize, badgePropSizeDefault);

  const form = useSelect(
    'form',
    badgePropForm,
    badgePropFormDefault,
    !minified,
  );
  const iconLeft = useBoolean('iconLeft', false, !minified);
  const iconRight = useBoolean('iconRight', false, !minified);

  return (
    <BadgeGroup
      items={badges}
      size={size}
      form={form}
      minified={minified}
      getItemIconLeft={(item) => (iconLeft ? item.iconLeft : undefined)}
      getItemIconRight={(item) => (iconRight ? item.iconRight : undefined)}
    />
  );
};

export default Variants;
