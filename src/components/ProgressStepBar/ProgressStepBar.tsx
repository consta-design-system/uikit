import './ProgressStepBar.css';

import React, { createRef, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
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
    activeStepId,
    getItemContent,
    getItemLabel,
    getItemKey,
    getItemOnClick,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    getItemLineStatus,
    ...otherProps
  } = usePropsHandler('ProgressStepBar', withDefaultGetters(props));

  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [linesSize, setLinesSize] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steps.length > 0) {
      if (activeStepId) {
        const sizeArray: number[] = [];
        steps.forEach((step, index) => {
          if (getItemKey(step) === activeStepId) {
            setActiveStepIndex(index);
          }
          if (index !== steps.length - 1)
            sizeArray.push(getLineSize(containerRef, stepsRef[index + 1]));
        });
        setLinesSize(sizeArray);
      } else setActiveStepIndex(-1);
    } else setActiveStepIndex(-1);
  }, [activeStepId, steps, direction, size]);

  const stepsRef = useMemo(
    () => new Array(steps.length).fill(null).map(() => createRef<HTMLButtonElement>()),
    [steps.length],
  );

  const getLineSize: (
    container: React.RefObject<HTMLElement>,
    activeElement: React.RefObject<HTMLElement>,
  ) => number = (container, activeElement) => {
    let size = 0;
    if (container && container.current && activeElement && activeElement.current) {
      const containerPosition = container.current.getBoundingClientRect();
      const activeElementPosition = activeElement.current.getBoundingClientRect();
      if (direction === 'vertical')
        size = activeElementPosition.y - containerPosition.y + activeElementPosition.height;
      else size = activeElementPosition.x - containerPosition.x;
    }
    return size;
  };

  return (
    <div
      ref={useForkRef([ref, containerRef])}
      {...otherProps}
      className={cnProgressStepBar({ direction }, [className])}
    >
      <div
        style={{
          ['--line-size' as string]: `${linesSize[steps.length - 2]}px`,
        }}
        className={cnProgressStepBar('Line', { size, direction })}
      >
        {steps.map((step, index) => (
          <div
            style={{
              ['--progress-line-size' as string]: `${
                index < activeStepIndex ? linesSize[index] || 0 : 0
              }px`,
              ['--progress-line-index' as string]: steps.length - index,
              ['--progress-line-resize' as string]: `${
                index < activeStepIndex ? (index + 1) * 0.3 : (steps.length - index - 1) * 0.3
              }s`,
            }}
            className={cnProgressStepBar('ProgressLine', {
              status: getItemLineStatus(step),
              direction,
            })}
          />
        ))}
      </div>
      {steps.map((step, index) => {
        let position: PropPosition = 'center';
        if (index === 0) position = 'start';
        if (index === steps.length - 1) position = 'end';
        return (
          <ProgressStepBarItem
            step={step}
            size={size}
            isCompletedStep={index < activeStepIndex}
            isActiveStep={index === activeStepIndex}
            position={position}
            ref={stepsRef[index]}
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
