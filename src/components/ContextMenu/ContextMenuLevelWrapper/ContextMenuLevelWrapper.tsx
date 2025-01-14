import './ContextMenuLevelWrapper.css';

import React, { forwardRef } from 'react';

import { mapVerticalSpace } from '##/components/ListCanary';
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
      onClickOutside,
      spareDirection,
      possibleDirections,
      direction,
      offset,
      anchorRef,
      position,
      onSetDirection,
      ...otherProps
    } = props;

    if (isMobile) {
      return (
        <div className={className}>
          <div
            className={cnContextMenuLevelWrapper('Mobile', [
              cnMixSpace({
                pV: mapVerticalSpace[size],
              }),
            ])}
            ref={ref}
            {...otherProps}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <Popover
        {...otherProps}
        ref={ref}
        className={className}
        onClickOutside={onClickOutside}
        spareDirection={spareDirection}
        possibleDirections={possibleDirections}
        direction={direction}
        offset={offset}
        anchorRef={anchorRef}
        position={position}
        onSetDirection={onSetDirection}
      >
        {children}
      </Popover>
    );
  },
);
