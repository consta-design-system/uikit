import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { Text } from '../Text/Text';

export type FieldCaptionPropStatus = 'alert' | 'warning' | 'success';

type FieldCaptionProps = {
  status?: FieldCaptionPropStatus;
};

const cnFieldCaption = cn('FieldCaption');

export const FieldCaption = forwardRefWithAs<FieldCaptionProps>(
  (props, ref) => {
    const { status, children, className, ...otherProps } = props;

    return (
      <Text
        {...otherProps}
        view={status || 'secondary'}
        className={cnFieldCaption(null, [className])}
        ref={ref}
        size="xs"
        lineHeight="2xs"
      >
        {children}
      </Text>
    );
  },
);
