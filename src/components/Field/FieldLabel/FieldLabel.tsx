import './FieldLabel.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { Text } from '##/components/Text/Text';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

export type FieldLabelPropSize = 'xs' | 's' | 'm' | 'l';

type FieldLabelProps = {
  icon?: IconComponent;
  size?: FieldLabelPropSize;
  required?: boolean;
};

const cnFieldLabel = cn('FieldLabel');

const iconSizeMap: Record<FieldLabelPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 's',
};

const iconSpaceMap: Record<FieldLabelPropSize, Space> = {
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
          className={cnMixSpace({ mL: iconSpaceMap[size] })}
          size={iconSizeMap[size]}
          view="secondary"
        />
      )}
    </Text>
  );
});
