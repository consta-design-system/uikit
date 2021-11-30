import './ProgressStepBar.css';

import React, { createRef, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';

import { ProgressStepBarItem } from './ProgressStepBarItem/ProgressStepBarItem';
import { ProgressStepBarLine } from './ProgressStepBarLine/ProgressStepBarLine';
import {
  cnProgressStepBar,
  DefaultItem,
  getItemPosition,
  getLineSize,
  Line,
  ProgressStepBarComponent,
  ProgressStepBarItemProps,
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
    activeStepIndex,
    onItemClick,
    getItemContent,
    getItemLabel,
    getItemPoint,
    getItemProgress,
    getItemStatus,
    getItemTooltipContent,
    getItemLineStatus,
    getItemOnClick,
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
            status: getItemLineStatus(step) || 'normal',
            size: getLineSize(containerRef, stepsRef[index + 1], direction),
          });
      });
      setLines(linesArray);
    }
  }, [activeStepIndex, steps, direction, size, width, height]);

  const stepsRef = useMemo(
    () => new Array(steps.length).fill(null).map(() => createRef<HTMLButtonElement>()),
    [steps.length],
  );

  const getStepItem: (item: ITEM, index: number) => ProgressStepBarItemProps = (item, index) => {
    const onClick = getItemOnClick(item);

    const onItemClickHandler = onItemClick
      ? (e: React.MouseEvent<Element, MouseEvent>) => {
          onItemClick({ e, item, index });
          onClick?.(e);
        }
      : undefined;

    return {
      content: getItemContent(item),
      label: getItemLabel(item),
      point: getItemPoint(item),
      progress: getItemProgress(item),
      status:
        typeof activeStepIndex === 'number' && activeStepIndex >= index
          ? getItemStatus(item) || 'normal'
          : 'system',
      tooltipContent: getItemTooltipContent(item),
      size,
      position: getItemPosition(index, steps.length),
      pointRef: stepsRef[index],
      direction,
      onClick: onClick || onItemClickHandler,
    };
  };

  return (
    <div
      {...otherProps}
      className={cnProgressStepBar({ direction }, [className])}
      ref={useForkRef([ref, containerRef])}
    >
      <ProgressStepBarLine
        lines={lines}
        size={size}
        direction={direction}
        activeStepIndex={activeStepIndex}
      />
      {steps.map((step, index) => (
        <ProgressStepBarItem {...getStepItem(step, index)} />
      ))}
    </div>
  );
}

export const ProgressStepBar = forwardRef(ProgressStepBarRender) as ProgressStepBarComponent;
