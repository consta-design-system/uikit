import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Direction } from '../Popover';
import { ActiveButton } from './useSlider/helper';

export const sliderPropStatus = ['alert', 'warning', 'success'] as const;
export type SliderPropStatus = typeof sliderPropStatus[number];
export const sliderPropStatusDefault = sliderPropStatus[0];

export type SliderPropView = 'default' | 'division';

export const sliderPropSize = ['s', 'xs', 'm', 'l'] as const;
export type SliderPropSize = typeof sliderPropSize[number];
export const sliderPropSizeDefault: SliderPropSize = sliderPropSize[0];

export type SliderValue<RANGE> = RANGE extends true ? [number, number] : number;

export type SliderPropOnChange<RANGE> = (
  value: SliderValue<RANGE>,
  prop: {
    e?:
      | Event
      | React.TouchEvent
      | React.MouseEvent
      | React.KeyboardEvent
      | React.ChangeEvent;
  },
) => void;

type SliderPropToolipFormatter = (value: number | undefined) => string;

type Side = IconComponent | 'input';

type Props<RANGE extends boolean = false> = {
  className?: string;
  step?: number | number[];
  view?: SliderPropView;
  disabled?: boolean;
  range?: RANGE;
  withTooltip?: boolean;
  value: SliderValue<RANGE>;
  label?: string;
  labelIcon?: IconComponent;
  caption?: string;
  status?: SliderPropStatus;
  min?: number;
  size?: SliderPropSize;
  max?: number;
  onChange?: SliderPropOnChange<RANGE>;
  onAfterChange?: SliderPropOnChange<RANGE>;
  leftSide?: Side;
  tooltipFormatter?: SliderPropToolipFormatter;
  rightSide?: Side;
  tooltipDirection?: Direction;
  tooltipPossibleDirections?: Direction[];
};

export type Line = {
  width: number;
  active: boolean;
  size?: number[];
};

export type SliderLineProps = {
  view?: SliderPropView;
  lines: Line[];
  disabled?: boolean;
  hovered?: boolean;
  onHover?: (hovered: boolean) => void;
};

export type SliderPointProps = PropsWithHTMLAttributes<
  {
    value?: number;
    disabled?: boolean;
    focused?: boolean;
    hovered?: boolean;
    withTooltip?: boolean;
    handlePress?: (typeButton: ActiveButton) => void;
    buttonLabel?: ActiveButton;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    popoverPosition?: TrackPosition;
    tooltipFormatter?: SliderPropToolipFormatter;
    onFocus?: (
      e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent,
      button: ActiveButton,
    ) => void;
    onKeyPress?: (e: React.KeyboardEvent, typeButton?: ActiveButton) => void;
    onHover?: (hovered: boolean) => void;
    position: number;
    active?: boolean;
    tooltipZIndex?: number;
    tooltipDirection?: Direction;
    tooltipPossibleDirections?: Direction[];
  },
  HTMLButtonElement
>;

export type SliderProps<RANGE extends boolean> = PropsWithHTMLAttributes<
  Props<RANGE>,
  HTMLDivElement
>;

export type SliderComponent = <RANGE extends boolean = false>(
  props: SliderProps<RANGE>,
) => React.ReactElement | null;

export const isRangeParams = (
  params: Props<boolean>,
): params is Props<true> => {
  return !!params.range;
};

export const isNotRangeParams = (
  params: Props<boolean>,
): params is Props<false> => {
  return !params.range;
};

export const defaultTooltipFormatter: SliderPropToolipFormatter = (value) =>
  value?.toString() || '';

export type TrackPosition = {
  x: number;
  y: number;
} | null;

export const getValueForInput = (
  props: SliderProps<boolean>,
  field: 0 | 1,
): number => {
  if (isRangeParams(props)) {
    return props.value[field];
  }
  return props.value as number;
};

type GetOnChandgeForInputReturned = (props: {
  e?: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
  value: number;
}) => void;

export const getOnChandgeForInput =
  (props: SliderProps<boolean>, field: 0 | 1): GetOnChandgeForInputReturned =>
  ({ e, value }) => {
    if (!props.onChange) {
      return;
    }
    if (isNotRangeParams(props)) {
      props.onChange(value, { e });
    }
    if (isRangeParams(props)) {
      const newValue: SliderValue<true> = field
        ? [props.value[0], value]
        : [value, props.value[1]];
      props.onChange(newValue, {
        e,
      });
    }
  };

export const getIcon = (side?: Side) => {
  if (side !== 'input') {
    return side;
  }
};

export const getMaxForStartField = (props: SliderProps<boolean>) => {
  if (isNotRangeParams(props)) {
    return props.max;
  }
  if (isRangeParams(props)) {
    return props.value[1];
  }
};

export const getMinForEndField = (props: SliderProps<boolean>) => {
  if (isNotRangeParams(props)) {
    return props.min;
  }
  if (isRangeParams(props)) {
    return props.value[0];
  }
};

export const getValidStep = (
  min: number,
  max: number,
  step?: number | number[],
) => {
  if (step) {
    if (Array.isArray(step)) {
      return step;
    }
    if (step <= 0) {
      return 1;
    }
    return step;
  }
  return Math.abs((max - min) / 100);
};
