import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text } from '../Text/Text';

export const fieldLabelPropSize = ['xs', 's', 'm', 'l'] as const;
export type FieldLabelPropSize = typeof fieldLabelPropSize[number];
export const fieldLabelPropSizeDefault: FieldLabelPropSize = 'm';

type FieldLabelProps = {
  size: FieldLabelPropSize;
};

const cnFieldLabel = cn('FieldLabel');

export const FieldLabel = forwardRefWithAs<FieldLabelProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <Text {...otherProps} view="secondary" className={cnFieldLabel(null, [className])} ref={ref}>
      {children}
    </Text>
  );
});
