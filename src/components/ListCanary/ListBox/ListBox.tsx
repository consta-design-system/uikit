import React, { forwardRef } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

import { defaultListPropSize, ListBoxProps } from '../types';
import { cnListBox } from './cnListBox';
import { mapVerticalSpase } from './mapVerticalSpase';

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
            pV: mapVerticalSpase[size],
          }),
          className,
        ])}
      />
    );
  },
);
