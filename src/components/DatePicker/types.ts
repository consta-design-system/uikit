import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { Locale } from 'date-fns';

import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  DateTimePropDisableDates,
  DateTimePropView,
  dateTimePropViewDefault,
  TimeOptions,
} from '../DateTime/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
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
type Time = 'time' | 'date-time' | 'date-time-range';

export const datePickerErrorTypes = [
  'outOfRange',
  'invalidInputAttempt',
  'startDateIsGreaterThanEndDate',
  'invalidTimeByTimeOptions',
] as const;

export type DatePickerPropValue<TYPE extends DatePickerPropType> =
  | (TYPE extends Range ? DateRange : Date)
  | null;

export type DatePickerPropPlaceholder<TYPE> = TYPE extends Range
  ? [string?, string?] | string
  : string;

export type DatePickerPropOnChange<TYPE extends DatePickerPropType> = (
  value: DatePickerPropValue<TYPE>,
  props: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | Event;
  },
) => void;

export const datePickerPropDropdownForm = [
  'default',
  'brick',
  'round',
] as const;
export type DatePickerPropDropdownForm =
  typeof datePickerPropDropdownForm[number];
export const datePickerPropDropdownFormDefault = datePickerPropDropdownForm[0];

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
      disableDates?: DateTimePropDisableDates;
      dropdownClassName?: string;
      dropdownRef?: React.Ref<HTMLDivElement>;
      size?: TextFieldPropSize;
      view?: TextFieldPropView;
      form?: TextFieldPropForm;
      status?: TextFieldPropStatus;
      onFocus?: DatePickerPropOnFocus<TYPE>;
      onBlur?: DatePickerPropOnFocus<TYPE>;
      autoFocus?: boolean;
      placeholder?: DatePickerPropPlaceholder<TYPE>;
      readOnly?: boolean;
      required?: boolean;
      tabIndex?: number;
      inputRef?: DatePickerPropInputRef<TYPE>;
      ariaLabel?: string;
      iconSize?: IconPropSize;
      format?: string;
      separator?: string;
      dropdownForm?: DatePickerPropDropdownForm;
      leftSide?: DatePickerPropSide<TYPE>;
      rightSide?: DatePickerPropSide<TYPE>;
      label?: string;
      labelIcon?: IconComponent;
      caption?: string;
      labelPosition?: 'top' | 'left';
      onChangeCurrentVisibleDate?: (date: Date) => void;
      currentVisibleDate?: Date;
      timeOptions?: TYPE extends Time ? TimeOptions : never;
      /**
       * @deprecated Use timeOptions instead.
       * TODO: major - удалить при мажорном релизе все свойства multiplicity*, оставив только работу с timeOptions.
       */
      multiplicitySeconds?: TYPE extends Time ? number : never;
      /**
       * @deprecated Use timeOptions instead.
       * TODO: major - удалить при мажорном релизе все свойства multiplicity*, оставив только работу с timeOptions.
       */
      multiplicityMinutes?: TYPE extends Time ? number : never;
      /**
       * @deprecated Use timeOptions instead.
       * TODO: major - удалить при мажорном релизе все свойства multiplicity*, оставив только работу с timeOptions.
       */
      multiplicityHours?: TYPE extends Time ? number : never;
      isMobile?: number;
      withClearButton?: boolean;
      onDropdownOpen?: (isOpen: boolean) => void;
      dropdownOpen?: boolean;
      ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
      dropdownViewportRef?: React.RefObject<HTMLElement>;
    },
    HTMLDivElement
  >;

export type DatePickerComponent = <TYPE extends DatePickerPropType = 'date'>(
  props: DatePickerProps<TYPE>,
) => React.ReactNode | null;

export type DatePickerTypeComponent<TYPE extends DatePickerPropType> = (
  props: Omit<DatePickerProps<TYPE>, 'type'>,
) => React.ReactNode | null;

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
      }
    | {
        type: typeof datePickerErrorTypes[3];
        stringValue: string;
        date: Date;
        HH?: string;
        mm?: string;
        ss?: string;
      },
) => void;
