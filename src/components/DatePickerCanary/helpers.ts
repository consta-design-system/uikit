import { Locale } from 'date-fns';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { DateTimePropView } from '../DateTimeCanary/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../TextField/TextField';

export const datePickerPropType = ['date', 'date-range'] as const;
export type DatePickerPropType = typeof datePickerPropType[number];
export const datePickerPropTypeDefault = datePickerPropType[0];

export type DatePickerPropDateTimeView = DateTimePropView;

export const datePickerErrorTypes = [
  'outOfRange',
  'invalidInputAttempt',
  'startDateIsGreaterThanEndDate',
] as const;

export type DatePickerPropValue<TYPE extends DatePickerPropType> =
  | (TYPE extends 'date' ? Date : DateRange)
  | null;

export type DatePickerPropOnChange<TYPE extends DatePickerPropType> = (props: {
  value: DatePickerPropValue<TYPE>;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | Event;
}) => void;

export const datePickerPropDropdownForm = ['default', 'brick', 'round'] as const;
export type DatePickerPropDropdownForm = typeof datePickerPropDropdownForm[number];
export const datePickerPropDropdownFormDefault = datePickerPropDropdownForm[0];

type DatePickerPropCalendarWidth<TYPE> = TYPE extends 'date' ? TextFieldPropWidth : never;

type DatePickerPropCalendarInputRef<TYPE> = TYPE extends 'date'
  ? React.Ref<HTMLInputElement>
  : never;

type DatePickerPropCalendarStartInputRef<TYPE> = TYPE extends 'date-range'
  ? React.Ref<HTMLInputElement>
  : never;

type DatePickerPropCalendarStartLeftSide<TYPE> = TYPE extends 'date-range'
  ? string | React.FC<IconProps>
  : never;

type DatePickerPropCalendarStartOnFocus<TYPE> = TYPE extends 'date-range'
  ? React.FocusEventHandler<HTMLElement>
  : never;

export type DatePickerProps<
  TYPE extends DatePickerPropType = 'date'
> = PropsWithHTMLAttributesAndRef<
  {
    type?: TYPE;
    value?: DatePickerPropValue<TYPE>;
    onChange?: DatePickerPropOnChange<TYPE>;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    dateTimeView?: DatePickerPropDateTimeView;
    locale?: Locale;
    children?: never;
    onError?: DatePickerPropOnError;
    id?: string;
    name?: string;
    disabled?: boolean;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    status?: TextFieldPropStatus;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    autoFocus?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    inputRef?: DatePickerPropCalendarInputRef<TYPE>;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    format?: string;
    separator?: string;
    dropdownForm?: DatePickerPropDropdownForm;
    width?: DatePickerPropCalendarWidth<TYPE>;
    leftSide?: string | React.FC<IconProps>;
    rightSide?: string | React.FC<IconProps>;
    startFieldInputRef?: DatePickerPropCalendarStartInputRef<TYPE>;
    endFieldInputRef?: DatePickerPropCalendarStartInputRef<TYPE>;
    startFieldLeftSide?: DatePickerPropCalendarStartLeftSide<TYPE>;
    startFieldRightSide?: DatePickerPropCalendarStartLeftSide<TYPE>;
    endFieldLeftSide?: DatePickerPropCalendarStartLeftSide<TYPE>;
    endFieldRightSide?: DatePickerPropCalendarStartLeftSide<TYPE>;
    startFieldOnFocus?: DatePickerPropCalendarStartOnFocus<TYPE>;
    endFieldOnFocus?: DatePickerPropCalendarStartOnFocus<TYPE>;
    startFieldOnBlur?: DatePickerPropCalendarStartOnFocus<TYPE>;
    endFieldOnBlur?: DatePickerPropCalendarStartOnFocus<TYPE>;
  },
  HTMLDivElement
>;

export type DatePickerComponent = <TYPE extends DatePickerPropType = 'date'>(
  props: DatePickerProps<TYPE>,
) => React.ReactElement | null;

export type DatePickerTypeDateComponent = (
  props: DatePickerProps<'date'>,
) => React.ReactElement | null;

export type DatePickerTypeDateRangeComponent = (
  props: DatePickerProps<'date-range'>,
) => React.ReactElement | null;

export type DatePickerPropOnError = (
  props:
    | {
        type: typeof datePickerErrorTypes[0];
        stringValue: string;
        dd?: string;
        MM?: string;
        yyyy?: string;
        date: Date;
      }
    | {
        type: typeof datePickerErrorTypes[1];
        stringValue: string;
        dd?: string;
        MM?: string;
        yyyy?: string;
      }
    | {
        type: typeof datePickerErrorTypes[2];
        date: [Date, Date];
      },
) => void;

export const isDateRangeParams = (
  params: DatePickerProps<DatePickerPropType>,
): params is DatePickerProps<'date-range'> => {
  return params.type === datePickerPropType[1];
};

export const isNotDateRangeParams = (
  params: DatePickerProps<DatePickerPropType>,
): params is DatePickerProps<'date'> => {
  return params.type === datePickerPropType[0];
};

export const datePickerPropSeparatorDefault = '.';
export const datePickerPropFormatDefault = `dd${datePickerPropSeparatorDefault}MM${datePickerPropSeparatorDefault}yyyy`;
export const datePickerPropPlaceholderDefault = `ДД${datePickerPropSeparatorDefault}ММ${datePickerPropSeparatorDefault}ГГГГ`;

export const normalizeRangeValue = (dateRange: DateRange): DateRange => {
  if (dateRange[0] && dateRange[1] && dateRange[0]?.getTime() > dateRange[1]?.getTime()) {
    return [dateRange[1], dateRange[0]];
  }
  return dateRange;
};
