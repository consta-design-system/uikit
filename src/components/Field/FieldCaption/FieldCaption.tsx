import React from 'react';

import { Text } from '##/components/Text';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

export type FieldCaptionPropStatus = 'alert' | 'warning' | 'success';

type FieldCaptionProps = {
  status?: FieldCaptionPropStatus;
};

export const FieldCaption = forwardRefWithAs<FieldCaptionProps>(
  (props, ref) => {
    const { status, children, className, ...otherProps } = props;

    return (
      <Text
        {...otherProps}
        view={status || 'secondary'}
        className={className}
        ref={ref}
        size="xs"
        lineHeight="2xs"
      >
        {children}
      </Text>
    );
  },
);
