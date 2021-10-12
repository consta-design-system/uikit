import './ProgressStepBar.css';

import React, { createRef, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';

import { ProgressStepBarItem, PropPosition } from './ProgressStepBarItem/ProgressStepBarItem';
import { ProgressStepBarLine } from './ProgressStepBarLine/ProgressStepBarLine';
import {
  cnProgressStepBar,
  DefaultItem,
  Line,
  ProgressStepBarComponent,
  ProgressStepBarProps,
  propDirectionDefault,
  propSizeDefault,
  StepBarItem,
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
    activeStepIndex,
    onItemClick,
    getItemContent,
    getItemLabel,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    getItemLineStatus,
    ...otherProps
  } = withDefaultGetters(props);

  const [lines, setLines] = useState<Line[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steps.length > 0) {
      const linesArray: Line[] = [];
      steps.forEach((step, index) => {
        if (index !== steps.length - 1)
          linesArray.push({
            status: getItemLineStatus(step),
            size: getLineSize(containerRef, stepsRef[index + 1]),
          });
      });
      console.log(linesArray);
      setLines(linesArray);
    }
  }, [activeStepIndex, steps, direction, size]);

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

  const getStepItem: (item: ITEM) => StepBarItem = (item) => {
    return {
      content: getItemContent(item),
      label: getItemLabel(item),
      point: getItemPoint(item),
      progress: getItemProgress(item),
      status: getItemStatus(item),
      tooltipContent: getItemTooltipContent(item),
    };
  };

  return (
    <div
      ref={useForkRef([ref, containerRef])}
      {...otherProps}
      className={cnProgressStepBar({ direction }, [className])}
    >
      <ProgressStepBarLine
        lines={lines}
        size={size}
        direction={direction}
        activeStepIndex={activeStepIndex}
      />
      {steps.map((step, index) => {
        let position: PropPosition = 'center';
        if (index === steps.length - 1) position = 'end';
        if (index === 0) position = 'start';
        return (
          <ProgressStepBarItem
            step={getStepItem(step)}
            size={size}
            position={position}
            ref={stepsRef[index]}
            direction={direction}
            onItemClick={(e) => onItemClick?.(e, step, index)}
          />
        );
      })}
    </div>
  );
}

export const ProgressStepBar = forwardRef(ProgressStepBarRender) as ProgressStepBarComponent;
