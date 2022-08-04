import { Locale, startOfToday } from 'date-fns';

import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
import { range } from '../../utils/array';
import { getByMap } from '../../utils/getByMap';
import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  DateTimeAdditionalControlRenderProp,
  DateTimePropView,
} from '../DateTimeCanary/helpers';
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
] as const;

export type DatePickerPropType = typeof datePickerPropType[number];
export const datePickerPropTypeDefault = datePickerPropType[0];

export type DatePickerPropDateTimeView = DateTimePropView;

type Range = 'date-range' | 'date-time-range';

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

type DatePickerPropCalendarWidth<TYPE> = TYPE extends Range
  ? TextFieldPropWidth
  : never;

type DatePickerPropCalendarInputRef<TYPE> = TYPE extends Range
  ? never
  : React.Ref<HTMLInputElement>;

type DatePickerPropCalendarStartInputRef<TYPE> = TYPE extends Range
  ? React.Ref<HTMLInputElement>
  : never;

type DatePickerPropCalendarStartLeftSide<TYPE> = TYPE extends Range
  ? string | IconComponent
  : never;

type DatePickerPropCalendarStartOnFocus<TYPE> = TYPE extends Range
  ? React.FocusEventHandler<HTMLElement>
  : never;

export type DatePickerProps<TYPE extends DatePickerPropType = 'date'> =
  PropsWithHTMLAttributesAndRef<
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

export const datePickerPropFormatTypeTime = `HH:mm:ss`;
export const datePickerPropPlaceholderTypeTime = `ЧЧ:ММ:СС`;

export const datePickerPropFormatTypeDateTime = `${datePickerPropFormatTypeDate} ${datePickerPropFormatTypeTime}`;
export const datePickerPropPlaceholderTypeDateTime = `${datePickerPropPlaceholderTypeDate} ${datePickerPropPlaceholderTypeTime}`;

export const normalizeRangeValue = (dateRange: DateRange): DateRange => {
  if (
    dateRange[0] &&
    dateRange[1] &&
    dateRange[0]?.getTime() > dateRange[1]?.getTime()
  ) {
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

  return markers.map((marker) =>
    formatArray?.indexOf(marker) < 0 ? 0 : map[marker],
  );
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

const mapFormForStart: Record<TextFieldPropForm, TextFieldPropForm> = {
  default: 'defaultClear',
  defaultClear: 'defaultClear',
  defaultBrick: 'defaultClear',
  brick: 'brickClear',
  brickDefault: 'brickClear',
  brickClear: 'brickClear',
  brickRound: 'brickClear',
  round: 'roundClear',
  roundClear: 'roundClear',
  roundBrick: 'roundClear',
  clearRound: 'clearClear',
  clearDefault: 'clearClear',
  clearBrick: 'clearClear',
  clearClear: 'clearClear',
};

const mapFormForEnd: Record<TextFieldPropForm, TextFieldPropForm> = {
  default: 'brickDefault',
  defaultClear: 'brickClear',
  defaultBrick: 'brick',
  brick: 'brick',
  brickDefault: 'brickDefault',
  brickClear: 'brickClear',
  brickRound: 'brickRound',
  round: 'brickRound',
  roundClear: 'brickClear',
  roundBrick: 'brick',
  clearRound: 'brickRound',
  clearDefault: 'brickDefault',
  clearBrick: 'brick',
  clearClear: 'brickClear',
};

export const getFormForStart = (form: TextFieldPropForm) =>
  getByMap(mapFormForStart, form);
export const getFormForEnd = (form: TextFieldPropForm) =>
  getByMap(mapFormForEnd, form);

const getPartDate = (
  formatArray: string[],
  stringArray: string[],
  marker: string,
) => {
  const index = formatArray.indexOf(marker);

  if (
    index >= 0 &&
    stringArray[index] &&
    stringArray[index].length === marker.length
  ) {
    return stringArray[index];
  }

  return undefined;
};

export const getParts = (
  format: string,
  separator: string,
  withTime?: boolean,
) => {
  if (withTime) {
    const [date, time] = format.split(' ');

    return [
      ...(date ? date.split(separator) : []),
      ...(time ? time.split(':') : []),
    ];
  }

  return format.split(separator);
};

export const getPartsDate = (
  value: string,
  format: string,
  separator: string,
  withTime: boolean,
  markers: string[],
) => {
  const formatArray = getParts(format, separator, withTime);
  const stringArray = getParts(value, separator, withTime);

  return markers.map((marker) => getPartDate(formatArray, stringArray, marker));
};

export const isTypeWithTime = (type: DatePickerPropType) =>
  type.indexOf('time') !== -1;
