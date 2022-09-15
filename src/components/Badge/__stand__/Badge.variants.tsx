import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { IconUser } from '../../../icons/IconUser/IconUser';
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
  const label = useText('label', 'это бейджик');
  const size = useSelect('size', badgePropSize, badgePropSizeDefault);
  const view = useSelect('view', badgePropView, badgePropViewDefault);
  const status = useSelect('status', badgePropStatus, badgePropStatusDefault);
  const form = useSelect('form', badgePropForm, badgePropFormDefault);
  const minified = useBoolean('minified', false);
  const icon = useBoolean('icon', false);

  return (
    <Badge
      label={label}
      size={size}
      view={view}
      status={status}
      form={form}
      minified={minified}
      icon={icon ? IconUser : undefined}
    />
  );
};

export default Variants;
