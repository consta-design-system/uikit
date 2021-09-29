import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text, TextProps } from '../Text/Text';

type ExcludeProps = 'size';

export const fieldLabelPropSize = ['xs', 's', 'm', 'l'] as const;
export type FieldLabelPropSize = typeof fieldLabelPropSize[number];
export const fieldLabelPropSizeDefault: FieldLabelPropSize = 'm';

export const fieldLabelPropPosition = ['top', 'left'] as const;
export type FieldLabelPropPosition = typeof fieldLabelPropPosition[number];
export const fieldLabelPropPositionDefault: FieldLabelPropPosition = 'top';

type FieldLabelProps = Omit<TextProps, ExcludeProps> & {
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
