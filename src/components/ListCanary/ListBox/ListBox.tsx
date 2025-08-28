import React, { forwardRef } from 'react';

import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';

import { defaultListPropSize, ListBoxProps } from '../types';
import { cnListBox } from './cnListBox';
import { mapVerticalSpace } from './mapVerticalSpace';

export const ListBox = forwardRef<HTMLDivElement, ListBoxProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      form,
      border,
      shadow,
      className,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnListBox({ size, form, border, shadow }, [
          cnMixSpace({
            pV: mapVerticalSpace[size],
          }),
          cnMixScrollBar({ size: 'xs' }),
          className,
        ])}
      />
    );
  },
);
