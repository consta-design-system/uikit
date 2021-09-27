import './FieldCaption.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Props as TextProps, Text } from '../Text/Text';

export const fieldCaptionPropStatus = ['alert', 'warning', 'success'] as const;
export type FieldCaptionPropStatus = typeof fieldCaptionPropStatus[number];
export const fieldCaptionPropStatusDefault: FieldCaptionPropStatus = 'alert';
type ExcludeProps = 'size' | 'lineHeight';

type Props = Omit<TextProps, ExcludeProps> & {
  status?: FieldCaptionPropStatus;
};

const cnFieldCaption = cn('FieldCaption');

export const FieldCaption = forwardRefWithAs<Props>((props, ref) => {
  const { status, children, className, ...otherProps } = props;

  return (
    <Text
      className={cnFieldCaption({ status }, [className])}
      {...otherProps}
      ref={ref}
      size="xs"
      lineHeight="2xs"
    >
      {children}
    </Text>
  );
});
