import React, { forwardRef } from 'react';

import { cnMixList } from '../MixList';
import { ListWrapperProps } from '../types';

export const ListWrapper = forwardRef<HTMLDivElement, ListWrapperProps>(
  (props, ref) => {
    const { size, form, children, className, ...otherProps } = props;
    return (
      <div
        className={cnMixList({ form, size }, [className])}
        role="listbox"
        ref={ref}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
);
