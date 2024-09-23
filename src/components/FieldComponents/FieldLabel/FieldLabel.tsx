import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { Text } from '##/components/Text/Text';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { FieldPropSize } from '../types';
import { cnFieldLabel } from './cnFieldLabel';

type FieldLabelProps = {
  icon?: IconComponent;
  size?: FieldPropSize;
  required?: boolean;
  iconRef?: React.Ref<HTMLSpanElement>;
};

const iconSizeMap: Record<FieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 's',
};

const iconSpaceMap: Record<FieldPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: '2xs',
  l: 'xs',
};

export const FieldLabel = forwardRefWithAs<FieldLabelProps>((props, ref) => {
  const {
    className,
    required,
    children,
    icon: Icon,
    size = 'm',
    iconRef,
    ...otherProps
  } = props;

  return (
    <Text
      {...otherProps}
      size={size}
      view="secondary"
      lineHeight="m"
      className={cnFieldLabel(null, [className])}
      ref={ref}
    >
      {children}
      {required && <span className={cnFieldLabel('Star')}>*</span>}
      {Icon && (
        <Icon
          ref={iconRef}
          className={cnMixSpace({ mL: iconSpaceMap[size] })}
          size={iconSizeMap[size]}
          view="secondary"
        />
      )}
    </Text>
  );
});
