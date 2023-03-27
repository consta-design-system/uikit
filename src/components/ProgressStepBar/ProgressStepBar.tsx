import './ProgressStepBar.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, {
  createRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useOverflow } from '../../hooks/useOverflow/useOverflow';
import { useScrollElements } from '../../hooks/useScrollElements/useScrollElements';
import { Button } from '../Button/Button';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import {
  calculateLines,
  cnProgressStepBar,
  DefaultItem,
  getItemPosition,
  Line,
  ProgressStepBarComponent,
  ProgressStepBarItemProps,
  ProgressStepBarProps,
  propDirectionDefault,
  propSizeDefault,
  withDefaultGetters,
} from './helpers';
import { ProgressStepBarItem } from './ProgressStepBarItem/ProgressStepBarItem';
import { ProgressStepBarLine } from './ProgressStepBarLine/ProgressStepBarLine';

export const COMPONENT_NAME = 'ProgressStepBar' as const;

function ProgressStepBarRender<ITEM = DefaultItem>(
  props: ProgressStepBarProps<ITEM>,
  ref: React.Ref<HTMLDivElement>,
) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    style,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, withDefaultGetters(props), containerRef);

  const [visibleIndex, setVisibleIndex] = useState<number>(
    activeStepIndex || 0,
  );

  const listRef = useRef<HTMLDivElement>(null);

  const { width, height } = useComponentSize(containerRef);

  const { refs, scrollTo } = useScrollElements(steps);

  const stepsRef = useMemo(
    () =>
      new Array(steps.length)
        .fill(null)
        .map(() => createRef<HTMLButtonElement>()),
    [steps.length],
  );

  const lines = useMemo(() => {
    const linesArray: Line[] = [];
    const sizes = calculateLines(refs, direction);
    steps.forEach((step, index) => {
      if (index !== steps.length - 1)
        linesArray.push({
          status: getItemLineStatus(step) || 'normal',
          size: sizes[index] ?? 0,
        });
    });
    return linesArray;
  }, [activeStepIndex, steps, direction, size, width, height]);

  useEffect(() => {
    setVisibleIndex(activeStepIndex || 0);
  }, [activeStepIndex]);

  useEffect(() => {
    scrollTo(visibleIndex);
  }, [visibleIndex]);

  const changePosition = (prev: boolean) => {
    if (prev && visibleIndex !== 0) {
      setVisibleIndex(visibleIndex - 1);
    }
    if (!prev && visibleIndex !== steps.length - 1) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const getStepItem: (item: ITEM, index: number) => ProgressStepBarItemProps = (
    item,
    index,
  ) => {
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
      pointRef: stepsRef[index] as React.RefObject<HTMLButtonElement>,
      direction,
      className: cnProgressStepBar('Item'),
      onClick: onClick || onItemClickHandler,
      key: cnProgressStepBar({ index }),
      tooltipZIndex:
        typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined,
    };
  };

  const isOverflow = useOverflow({ currentRef: listRef });

  return (
    <div
      {...otherProps}
      style={style}
      className={cnProgressStepBar({ isOverflow }, [className])}
      ref={useForkRef([ref, containerRef])}
    >
      {isOverflow && direction !== 'vertical' && (
        <Button
          iconLeft={() => <IconArrowLeft size="xs" />}
          view="clear"
          onlyIcon
          type="button"
          size="xs"
          className={cnProgressStepBar('Button', { side: 'left' })}
          onClick={() => changePosition(true)}
        />
      )}
      <div
        ref={listRef}
        className={cnProgressStepBar('List', {
          direction,
          overflow: isOverflow,
        })}
      >
        <ProgressStepBarLine
          lines={lines}
          size={size}
          direction={direction}
          activeStepIndex={activeStepIndex}
        />
        {steps.map((step, index) => (
          <ProgressStepBarItem
            ref={refs[index] as React.RefObject<HTMLDivElement>}
            {...getStepItem(step, index)}
          />
        ))}
      </div>
      {isOverflow && direction !== 'vertical' && (
        <Button
          iconLeft={() => <IconArrowRight size="xs" />}
          view="clear"
          onlyIcon
          size="xs"
          type="button"
          className={cnProgressStepBar('Button', { side: 'right' })}
          onClick={() => changePosition(false)}
        />
      )}
    </div>
  );
}

export const ProgressStepBar = forwardRef(
  ProgressStepBarRender,
) as ProgressStepBarComponent;
