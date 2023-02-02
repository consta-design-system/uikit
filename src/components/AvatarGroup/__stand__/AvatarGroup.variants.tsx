import { useBoolean, useNumber, useSelect } from '@consta/stand';
import React from 'react';

import { avatarGroupItems } from '../__mocks__/mock.data';
import {
  AvatarGroup,
  avatarGroupPropForm,
  avatarGroupPropFormDefault,
  avatarGroupPropSize,
  avatarGroupPropSizeDefault,
} from '../AvatarGroup';

const Variants = () => {
  const visibleCountAuto = useBoolean('visibleCountAuto');
  const visibleCount = useNumber('visibleCount', 4, !visibleCountAuto);

  const size = useSelect(
    'size',
    avatarGroupPropSize,
    avatarGroupPropSizeDefault,
  );

  const form = useSelect(
    'form',
    avatarGroupPropForm,
    avatarGroupPropFormDefault,
  );

  return (
    <AvatarGroup
      visibleCount={visibleCountAuto ? 'auto' : visibleCount}
      items={avatarGroupItems}
      size={size}
      form={form}
    />
  );
};

export default Variants;
