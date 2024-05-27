import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { DateRange } from '##/utils/types/Date';

import { DatePickerFieldTypeDateProps } from '../DatePickerFieldTypeDate/helpers';

type DatePickerFieldTypeDateRangePropOnChange = (
  value: DateRange | null,
  props: {
    e: Event;
  },
) => void;

export type DatePickerFieldTypeDateRangeProps = Omit<
  DatePickerFieldTypeDateProps,
  | 'onChange'
  | 'value'
  | 'inputRef'
  | 'leftSide'
  | 'rightSide'
  | 'id'
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'placeholder'
> & {
  onChange?: DatePickerFieldTypeDateRangePropOnChange;
  value?: DateRange | null;
  startFieldInputRef?: React.Ref<HTMLInputElement>;
  endFieldInputRef?: React.Ref<HTMLInputElement>;
  startFieldLeftSide?: string | IconComponent;
  startFieldRightSide?: string | IconComponent;
  endFieldLeftSide?: string | IconComponent;
  endFieldRightSide?: string | IconComponent;
  startFieldRef?: React.Ref<HTMLDivElement>;
  endFieldRef?: React.Ref<HTMLDivElement>;
  startFieldOnFocus?: React.FocusEventHandler<HTMLElement>;
  endFieldOnFocus?: React.FocusEventHandler<HTMLElement>;
  startFieldOnClick?: React.MouseEventHandler<HTMLElement>;
  endFieldOnClick?: React.MouseEventHandler<HTMLElement>;
  startFieldOnBlur?: React.FocusEventHandler<HTMLElement>;
  endFieldOnBlur?: React.FocusEventHandler<HTMLElement>;
  startFocused?: boolean;
  endFocused?: boolean;
  id?: string;
  onChangeCurrentVisibleDate?: (date: Date) => void;
  currentVisibleDate?: Date;
  startFieldName?: string;
  endFieldName?: string;
  startFieldPlaceholder?: string;
  endFieldPlaceholder?: string;
};
