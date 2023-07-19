import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { ActiveButton } from './useSlider/helper';

export const propStatus = ['alert', 'warning', 'success'] as const;
export type PropStatus = typeof propStatus[number];
export const defaultPropStatus = propStatus[0];

export type PropView = 'default' | 'division';

export const propSize = ['s', 'xs', 'm', 'l'] as const;
export type PropSize = typeof propSize[number];
export const defaultPropSize: PropSize = propSize[0];

export type SliderValue<RANGE> = RANGE extends true ? [number, number] : number;

export type PropOnChange<RANGE> = (prop: {
  e?:
    | Event
    | React.TouchEvent
    | React.MouseEvent
    | React.KeyboardEvent
    | React.ChangeEvent;
  value: SliderValue<RANGE>;
}) => void;

type PropToolipFormatter = (value: number | undefined) => string;

type Side = IconComponent | 'input';

type Props<RANGE extends boolean = false> = {
  className?: string;
  step?: number | number[];
  view?: PropView;
  disabled?: boolean;
  range?: RANGE;
  withTooltip?: boolean;
  value: SliderValue<RANGE>;
  label?: string;
  labelIcon?: IconComponent;
  caption?: string;
  status?: PropStatus;
  min?: number;
  size?: PropSize;
  max?: number;
  onChange?: PropOnChange<RANGE>;
  onAfterChange?: PropOnChange<RANGE>;
  leftSide?: Side;
  tooltipFormatter?: PropToolipFormatter;
  rightSide?: Side;
};

export type Line = {
  width: number;
  active: boolean;
  size?: number[];
};

export type SliderLineProps = {
  view?: PropView;
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
    tooltipFormatter?: PropToolipFormatter;
    onFocus?: (
      e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent,
      button: ActiveButton,
    ) => void;
    onKeyPress?: (e: React.KeyboardEvent, typeButton?: ActiveButton) => void;
    onHover?: (hovered: boolean) => void;
    position: number;
    active?: boolean;
    tooltipZIndex?: number;
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

export const defaultTooltipFormatter: PropToolipFormatter = (value) =>
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
      props.onChange({ e, value });
    }
    if (isRangeParams(props)) {
      props.onChange({
        e,
        value: field ? [props.value[0], value] : [value, props.value[1]],
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
