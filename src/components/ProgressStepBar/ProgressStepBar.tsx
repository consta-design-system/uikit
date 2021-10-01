import './ProgressStepBar.css';

import React, { forwardRef } from 'react';

import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

import { ProgressStepBarItem, PropPosition } from './ProgressStepBarItem/ProgressStepBarItem';
import {
  cnProgressStepBar,
  DefaultItem,
  ProgressStepBarComponent,
  ProgressStepBarProps,
  propDirectionDefault,
  propSizeDefault,
  withDefaultGetters,
} from './helpers';

function ProgressStepBarRender<ITEM = DefaultItem>(
  props: ProgressStepBarProps<ITEM>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    steps = [],
    direction = propDirectionDefault,
    size = propSizeDefault,
    className,
    getItemContent,
    getItemLabel,
    getItemOnClick,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    ...otherProps
  } = usePropsHandler('ProgressStepBar', withDefaultGetters(props));

  return (
    <div ref={ref} {...otherProps} className={cnProgressStepBar({ direction }, [className])}>
      {steps.map((step, index) => {
        let position: PropPosition = 'center';
        if (index === 0) position = 'start';
        if (index === steps.length - 1) position = 'end';
        return (
          <ProgressStepBarItem
            step={step}
            size={size}
            position={position}
            direction={direction}
            getItemContent={getItemContent}
            getItemLabel={getItemLabel}
            getItemOnClick={getItemOnClick}
            getItemPoint={getItemPoint}
            getItemProgress={getItemProgress}
            getItemStatus={getItemStatus}
            getItemTooltipContent={getItemTooltipContent}
          />
        );
      })}
    </div>
  );
}

export const ProgressStepBar = forwardRef(ProgressStepBarRender) as ProgressStepBarComponent;
