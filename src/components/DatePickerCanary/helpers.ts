import { Locale, startOfToday } from 'date-fns';

import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
import { range } from '../../utils/array';
import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { DateTimeAdditionalControlRenderProp, DateTimePropView } from '../DateTimeCanary/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../TextField/TextField';

export const datePickerPropType = ['date', 'date-range', 'date-time'] as const;
export type DatePickerPropType = typeof datePickerPropType[number];
export const datePickerPropTypeDefault = datePickerPropType[0];

export type DatePickerPropDateTimeView = DateTimePropView;

export const datePickerErrorTypes = [
  'outOfRange',
  'invalidInputAttempt',
  'startDateIsGreaterThanEndDate',
] as const;

export type DatePickerPropValue<TYPE extends DatePickerPropType> =
  | (TYPE extends 'date' | 'date-time' ? Date : DateRange)
  | null;

export type DatePickerPropOnChange<TYPE extends DatePickerPropType> = (props: {
  value: DatePickerPropValue<TYPE>;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | Event;
}) => void;

export const datePickerPropDropdownForm = ['default', 'brick', 'round'] as const;
export type DatePickerPropDropdownForm = typeof datePickerPropDropdownForm[number];
export const datePickerPropDropdownFormDefault = datePickerPropDropdownForm[0];

type DatePickerPropCalendarWidth<TYPE> = TYPE extends 'date' | 'date-time'
  ? TextFieldPropWidth
  : never;

type DatePickerPropCalendarInputRef<TYPE> = TYPE extends 'date' | 'date-time'
  ? React.Ref<HTMLInputElement>
  : never;

type DatePickerPropCalendarStartInputRef<TYPE> = TYPE extends 'date-range'
  ? React.Ref<HTMLInputElement>
  : never;

type DatePickerPropCalendarStartLeftSide<TYPE> = TYPE extends 'date-range'
  ? string | IconComponent
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
    renderAdditionalControls?: DateTimeAdditionalControlRenderProp;
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
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
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
    label?: string;
    caption?: string;
    labelPosition?: 'top' | 'left';
    onChangeCurrentVisibleDate?: (date: Date) => void;
    currentVisibleDate?: Date;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
  },
  HTMLDivElement
>;

export type DatePickerComponent = <TYPE extends DatePickerPropType = 'date'>(
  props: DatePickerProps<TYPE>,
) => React.ReactElement | null;

export type DatePickerTypeComponent<TYPE extends DatePickerPropType> = (
  props: Omit<DatePickerProps<TYPE>, 'type'>,
) => React.ReactElement | null;

export type DatePickerPropOnError = (
  props:
    | {
        type: typeof datePickerErrorTypes[0];
        stringValue: string;
        dd?: string;
        MM?: string;
        yyyy?: string;
        ss?: string;
        mm?: string;
        HH?: string;
        date: Date;
      }
    | {
        type: typeof datePickerErrorTypes[1];
        stringValue: string;
        dd?: string;
        MM?: string;
        yyyy?: string;
        ss?: string;
        mm?: string;
        HH?: string;
      }
    | {
        type: typeof datePickerErrorTypes[2];
        date: [Date, Date];
      },
) => void;

export const datePickerPropSeparatorDefault = '.';
export const datePickerPropFormatTypeDate = `dd${datePickerPropSeparatorDefault}MM${datePickerPropSeparatorDefault}yyyy`;
export const datePickerPropPlaceholderTypeDate = `ДД${datePickerPropSeparatorDefault}ММ${datePickerPropSeparatorDefault}ГГГГ`;

export const datePickerPropFormatTypeDateTime = `${datePickerPropFormatTypeDate} HH:mm:ss`;
export const datePickerPropPlaceholderTypeDateTime = `${datePickerPropPlaceholderTypeDate} ЧЧ:ММ:СС`;

export const normalizeRangeValue = (dateRange: DateRange): DateRange => {
  if (dateRange[0] && dateRange[1] && dateRange[0]?.getTime() > dateRange[1]?.getTime()) {
    return [dateRange[1], dateRange[0]];
  }
  return dateRange;
};

export const getMultiplicityTime = (
  format: string,
  multiplicityHours: number | undefined,
  multiplicityMinutes: number | undefined,
  multiplicitySeconds: number | undefined,
) => {
  const markers = ['HH', 'mm', 'ss'] as const;
  const formatArray = format.split(' ')[1]?.split(':');
  const map = {
    HH: multiplicityHours,
    mm: multiplicityMinutes,
    ss: multiplicitySeconds,
  } as const;

  return markers.map((marker) => (formatArray?.indexOf(marker) < 0 ? 0 : map[marker]));
};

export const getTimeEnum = (
  length: number,
  multiplicity = 1,
  startOfUnits: (date: Date) => Date,
  addUnits: (date: Date, amount: number) => Date,
  getItemLabel: (date: Date) => string,
) => {
  const numbers = range(multiplicity ? Math.floor(length / multiplicity) : 0);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnits(startOfToday());

  return numbers.map((number) => {
    return getItemLabel(addUnits(startDate, number * multiplicity));
  });
};
