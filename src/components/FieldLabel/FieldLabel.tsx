import './FieldLabel.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text } from '../Text/Text';

export type FieldLabelPropSize = 'xs' | 's' | 'm' | 'l';

type FieldLabelProps = {
  size?: FieldLabelPropSize;
  required?: boolean;
};

const cnFieldLabel = cn('FieldLabel');

export const FieldLabel = forwardRefWithAs<FieldLabelProps>((props, ref) => {
  const { className, required, children, ...otherProps } = props;

  return (
    <Text {...otherProps} view="secondary" className={cnFieldLabel(null, [className])} ref={ref}>
      {children}
      {required && <span className={cnFieldLabel('Star')}>*</span>}
    </Text>
  );
});
