import React from 'react';

import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

import { ActiveButton } from './useSlider/helper';

export const propStatus = ['alert', 'warning', 'success'] as const;
export type PropStatus = typeof propStatus[number];
export const defaultPropStatus = propStatus[0];

export type PropView = 'default' | 'division';

export const propSize = ['s', 'xs', 'm', 'l'] as const;
export type PropSize = typeof propSize[number];
export const defaultPropSize: PropSize = propSize[1];

export type SliderValue<RANGE> = RANGE extends true ? [number, number] : number;

export type PropOnChange<RANGE> = (prop: {
  e?: Event | React.TouchEvent | React.MouseEvent | React.KeyboardEvent;
  value: SliderValue<RANGE>;
}) => void;

export const propWidth = ['default', 'full'] as const;
export type PropWidth = typeof propWidth[number];
export const defultPropWidth: PropWidth = propWidth[1];

export type PropSide<RANGE> =
  | React.ReactNode
  | (({ value }: { value?: SliderValue<RANGE> }) => React.ReactElement);

type Props<RANGE extends boolean = false> = {
  className?: string;
  step?: number | number[];
  view?: PropView;
  disabled?: boolean;
  range?: RANGE;
  withTooltip?: boolean;
  value: SliderValue<RANGE>;
  label?: string;
  caption?: string;
  smooth?: boolean;
  status?: PropStatus;
  min?: number;
  size?: PropSize;
  width?: PropWidth;
  max?: number;
  onChange?: PropOnChange<RANGE>;
  leftSide?: PropSide<RANGE>;
  rightSide?: PropSide<RANGE>;
};

export type Line = {
  width: number;
  active: boolean;
  size?: number[];
};

export type SliderLineProps = {
  view?: PropView;
  lines?: Line[];
  disabled?: boolean;
  hovered?: boolean;
  onHover?: (hovered: boolean) => void;
};

export type SliderPointProps = {
  value?: number;
  disabled?: boolean;
  focused?: boolean;
  hovered?: boolean;
  withTooltip?: boolean;
  buttonLabel?: ActiveButton;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  popoverPosition?: TrackPosition;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>, button: ActiveButton) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  onHover?: (hovered: boolean) => void;
  position: number;
};

export type SliderProps<RANGE extends boolean> = PropsWithHTMLAttributes<
  Props<RANGE>,
  HTMLDivElement
>;

export type TrackPosition = {
  x: number;
  y: number;
} | null;
