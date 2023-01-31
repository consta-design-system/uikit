import './ContextMenuLevelWrapper.css';

import React, { forwardRef } from 'react';

import { mapVerticalSpase } from '##/components/ListCanary';
import { Popover } from '##/components/Popover';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { contextMenuDefaultSize, ContextMenuLevelWrapperProps } from '../types';

const cnContextMenuLevelWrapper = cn('ContextMenuLevelWrapper');

export const ContextMenuLevelWrapper = forwardRef(
  (props: ContextMenuLevelWrapperProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      isMobile,
      children,
      className,
      size = contextMenuDefaultSize,
      ...otherProps
    } = props;

    if (isMobile) {
      return (
        <div className={className}>
          <div
            className={cnContextMenuLevelWrapper('Mobile', [
              cnMixSpace({
                pV: mapVerticalSpase[size],
              }),
            ])}
            ref={ref}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <Popover {...otherProps} ref={ref} className={className}>
        {children}
      </Popover>
    );
  },
);
