import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { IconUser } from '@consta/icons/IconUser';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  Badge,
  badgePropForm,
  badgePropFormDefault,
  badgePropSize,
  badgePropSizeDefault,
  badgePropStatus,
  badgePropStatusDefault,
  badgePropView,
  badgePropViewDefault,
} from '../Badge';

const Variants = () => {
  const minified = useBoolean('minified', false);
  const label = useText('label', 'это бейджик', !minified);
  const size = useSelect('size', badgePropSize, badgePropSizeDefault);
  const view = useSelect(
    'view',
    badgePropView,
    badgePropViewDefault,
    !minified,
  );
  const status = useSelect('status', badgePropStatus, badgePropStatusDefault);
  const form = useSelect(
    'form',
    badgePropForm,
    badgePropFormDefault,
    !minified,
  );
  const iconLeft = useBoolean('iconLeft', false, !minified);
  const iconRight = useBoolean('iconRight', false, !minified);

  return (
    <Badge
      label={label}
      size={size}
      view={view}
      status={status}
      form={form}
      minified={minified}
      iconLeft={iconLeft ? IconUser : undefined}
      iconRight={iconRight ? IconDinosaur : undefined}
    />
  );
};

export default Variants;
