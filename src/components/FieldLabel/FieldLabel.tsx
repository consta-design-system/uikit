import './FieldLabel.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text, TextProps } from '../Text/Text';

type ExcludeProps = 'size';

export const fieldLabelPropSize = ['xs', 's', 'm', 'l'] as const;
export type FieldLabelPropSize = typeof fieldLabelPropSize[number];
export const fieldLabelPropSizeDefault: FieldLabelPropSize = 'm';

export const fieldLabelPropAlign = ['top', 'left'] as const;
export type FieldLabelPropAlign = typeof fieldLabelPropAlign[number];
export const fieldLabelPropAlignDefault: FieldLabelPropAlign = 'top';

type FieldLabelProps = Omit<TextProps, ExcludeProps> & {
  size: FieldLabelPropSize;
};

const cnFieldLabel = cn('FieldLabel');

export const FieldLabel = forwardRefWithAs<FieldLabelProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <Text {...otherProps} className={cnFieldLabel(null, [className])} ref={ref}>
      {children}
    </Text>
  );
});
