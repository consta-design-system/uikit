import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text } from '../Text/Text';

export const fieldCaptionPropStatus = ['alert', 'warning', 'success'] as const;
export type FieldCaptionPropStatus = typeof fieldCaptionPropStatus[number];
export const fieldCaptionPropStatusDefault: FieldCaptionPropStatus = 'alert';

type FieldCaptionProps = {
  status?: FieldCaptionPropStatus;
};

const cnFieldCaption = cn('FieldCaption');

export const FieldCaption = forwardRefWithAs<FieldCaptionProps>((props, ref) => {
  const { status, children, className, ...otherProps } = props;

  return (
    <Text
      view={status || 'secondary'}
      className={cnFieldCaption(null, [className])}
      {...otherProps}
      ref={ref}
      size="xs"
      lineHeight="2xs"
    >
      {children}
    </Text>
  );
});
