import './ProgressStepBar.css';

import React, { createRef, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';

import { ProgressStepBarItem } from './ProgressStepBarItem/ProgressStepBarItem';
import { ProgressStepBarLine } from './ProgressStepBarLine/ProgressStepBarLine';
import {
  cnProgressStepBar,
  DefaultItem,
  Line,
  ProgressStepBarComponent,
  ProgressStepBarItemProps,
  ProgressStepBarProps,
  propDirectionDefault,
  PropPosition,
  propSizeDefault,
  withDefaultGetters,
} from './helpers';

export type TabDimensions = {
  size: number;
  gap: number;
};

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

  const { width, height } = useComponentSize(containerRef);

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
      setLines(linesArray);
    }
  }, [activeStepIndex, steps, direction, size, width, height]);

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

  const getStepItem: (item: ITEM, index: number) => ProgressStepBarItemProps = (item, index) => {
    let position: PropPosition = 'center';
    if (index === steps.length - 1) position = 'end';
    if (index === 0) position = 'start';
    return {
      content: getItemContent(item),
      label: getItemLabel(item),
      point: getItemPoint(item),
      progress: getItemProgress(item),
      status: getItemStatus(item),
      tooltipContent: getItemTooltipContent(item),
      size,
      position,
      buttonRef: stepsRef[index],
      direction,
      onItemClick: (e) => onItemClick?.(e, item, index),
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
        const item = getStepItem(step, index);
        return <ProgressStepBarItem {...item} />;
      })}
    </div>
  );
}

export const ProgressStepBar = forwardRef(ProgressStepBarRender) as ProgressStepBarComponent;
