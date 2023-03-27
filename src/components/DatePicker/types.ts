import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { Locale } from 'date-fns';

import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { DateTimePropView, dateTimePropViewDefault } from '../DateTime/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../TextField/TextField';

export const datePickerPropType = [
  'date',
  'date-range',
  'date-time',
  'date-time-range',
  'time',
  'year',
  'year-range',
  'month',
  'month-range',
] as const;

export type DatePickerPropType = typeof datePickerPropType[number];
export const datePickerPropTypeDefault = datePickerPropType[0];

export type DatePickerPropDateTimeView = DateTimePropView;
export const datePickerPropDateTimeViewDefault = dateTimePropViewDefault;

type Range = 'date-range' | 'date-time-range' | 'year-range' | 'month-range';

export const datePickerErrorTypes = [
  'outOfRange',
  'invalidInputAttempt',
  'startDateIsGreaterThanEndDate',
] as const;

export type DatePickerPropValue<TYPE extends DatePickerPropType> =
  | (TYPE extends Range ? DateRange : Date)
  | null;

export type DatePickerPropOnChange<TYPE extends DatePickerPropType> = (props: {
  value: DatePickerPropValue<TYPE>;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | Event;
}) => void;

export const datePickerPropDropdownForm = [
  'default',
  'brick',
  'round',
] as const;
export type DatePickerPropDropdownForm =
  typeof datePickerPropDropdownForm[number];
export const datePickerPropDropdownFormDefault = datePickerPropDropdownForm[0];

type DatePickerPropWidth<TYPE> = TYPE extends Range
  ? TextFieldPropWidth
  : never;

type DatePickerPropInputRef<TYPE> = TYPE extends Range
  ? [React.Ref<HTMLInputElement>?, React.Ref<HTMLInputElement>?]
  : React.Ref<HTMLInputElement>;

type DatePickerPropSide<TYPE> = TYPE extends Range
  ?
      | [(string | IconComponent)?, (string | IconComponent)?]
      | string
      | IconComponent
  : string | IconComponent;

type DatePickerPropOnFocus<TYPE> = TYPE extends Range
  ?
      | [
          React.FocusEventHandler<HTMLElement>?,
          React.FocusEventHandler<HTMLElement>?,
        ]
      | React.FocusEventHandler<HTMLElement>
  : React.FocusEventHandler<HTMLElement>;

type DatePickerPropName<TYPE> = TYPE extends Range
  ? [string?, string?] | string
  : string;

export type DatePickerAdditionalControlRenderFn = (props: {
  currentVisibleDate?: Date;
}) => React.ReactNode | React.ReactNode[];

export type DatePickerAdditionalControlRenderProp =
  | React.ReactNode
  | DatePickerAdditionalControlRenderFn;

export type DatePickerProps<TYPE extends DatePickerPropType = 'date'> =
  PropsWithHTMLAttributesAndRef<
    {
      type?: TYPE;
      value?: DatePickerPropValue<TYPE>;
      onChange?: DatePickerPropOnChange<TYPE>;
      minDate?: Date;
      maxDate?: Date;
      renderAdditionalControls?: DatePickerAdditionalControlRenderProp;
      events?: Date[];
      dateTimeView?: DatePickerPropDateTimeView;
      locale?: Locale;
      children?: never;
      onError?: DatePickerPropOnError;
      id?: string;
      name?: DatePickerPropName<TYPE>;
      disabled?: boolean;
      dropdownClassName?: string;
      size?: TextFieldPropSize;
      view?: TextFieldPropView;
      form?: TextFieldPropForm;
      status?: TextFieldPropStatus;
      onFocus?: DatePickerPropOnFocus<TYPE>;
      onBlur?: DatePickerPropOnFocus<TYPE>;
      autoFocus?: boolean;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      tabIndex?: number;
      inputRef?: DatePickerPropInputRef<TYPE>;
      ariaLabel?: string;
      iconSize?: IconPropSize;
      format?: string;
      separator?: string;
      dropdownForm?: DatePickerPropDropdownForm;
      width?: DatePickerPropWidth<TYPE>;
      leftSide?: DatePickerPropSide<TYPE>;
      rightSide?: DatePickerPropSide<TYPE>;
      label?: string;
      labelIcon?: IconComponent;
      caption?: string;
      labelPosition?: 'top' | 'left';
      onChangeCurrentVisibleDate?: (date: Date) => void;
      currentVisibleDate?: Date;
      multiplicitySeconds?: number;
      multiplicityMinutes?: number;
      multiplicityHours?: number;
      isMobile?: number;
      withClearButton?: boolean;
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
