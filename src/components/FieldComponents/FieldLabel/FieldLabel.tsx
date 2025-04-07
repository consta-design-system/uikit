import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { Text } from '##/components/Text/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { AsTags } from '##/utils/types/AsTags';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { FieldPropSize } from '../types';
import { cnFieldLabel } from './cnFieldLabel';
import { iconSizeMap, iconSpaceMap } from './helpers';

type FieldLabelProps = {
  icon?: IconComponent;
  size?: FieldPropSize;
  required?: boolean;
  iconRef?: React.Ref<HTMLSpanElement>;
};

export const FieldLabel = forwardRefWithAs<FieldLabelProps>((props, ref) => {
  const {
    className,
    required,
    children,
    icon: Icon,
    size = 'm',
    iconRef,
    as,
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
      as={as as AsTags}
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
