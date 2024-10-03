import React from 'react';

import { Text } from '##/components/Text';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { FieldPropStatus } from '../types';

type FieldCaptionProps = {
  status?: FieldPropStatus;
};

export const FieldCaption = forwardRefWithAs<FieldCaptionProps>(
  (props, ref) => {
    const { status, children, className, ...otherProps } = props;

    return (
      <Text
        {...otherProps}
        view={status || 'ghost'}
        className={className}
        ref={ref}
        size="xs"
        lineHeight="m"
      >
        {children}
      </Text>
    );
  },
);
