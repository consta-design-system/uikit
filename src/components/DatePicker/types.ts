import React from 'react';

export const sizes = ['s', 'm', 'l'] as const;
export type Size = typeof sizes[number];
export type DateRange = [Date?, Date?];
export type StyleProps = {
  size?: Size;
  className?: string;
};

export type ValueProps<V> = {
  value?: V;
};

export type MinMaxDate = {
  minDate: Date;
  maxDate: Date;
};

export type OnChangeProps<V> = {
  onChange: (value?: V) => void;
};

export type DateControlType<V> = {
  value?: V;
  onChange: (value?: V) => void;
  isInvalid?: boolean;
  tooltipContent?: React.ReactNode;
  isCalendarOpened?: boolean;
} & StyleProps;

export type RenderControl<V> = (props: DateControlType<V>) => React.ReactNode;

export type BaseControlProps<T> = {
  value?: T;
  onChange: (value?: T) => void;
  renderControls?: RenderControl<T>;
};

export type BaseRenderControlsProps = MinMaxDate &
  Pick<StyleProps, 'size'> & {
    isTooltipVisible: boolean;
  };

export type RenderControlsType<T> = (
  props: BaseControlProps<T> & BaseRenderControlsProps,
) => React.ReactNode;

export type RenderSliderProps<T> = {
  currentVisibleDate: Date;
  minDate: Date;
  maxDate: Date;
  onChange: (date: Date) => void;
  value?: T;
};
export type RenderSliderType<T> = (props: RenderSliderProps<T>) => React.ReactNode;
export type MakeDateOutOfRangeText = (minDate: string, maxDate: string) => string;
export type BaseDatePickerProps = MinMaxDate & StyleProps;
