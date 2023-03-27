import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';

export const dateTimePropView = ['classic', 'book', 'slider'] as const;
export type DateTimePropView = typeof dateTimePropView[number];
export const dateTimePropViewDefault = dateTimePropView[0];

export const dateTimePropType = [
  'date',
  'month',
  'year',
  'time',
  'date-time',
] as const;
export type DateTimePropType = typeof dateTimePropType[number];
export const dateTimePropTypeDefault = dateTimePropType[0];

export type DateTimePropDisableDates = Array<Date | [Date, Date]>;

export type СapableRangeType = 'date' | 'month' | 'year' | 'date-time';

export type DateTimePropValue<TYPE> = TYPE extends СapableRangeType
  ? Date | DateRange
  : Date;

export type DateTimePropOnChange = (props: {
  value: Date;
  e: React.MouseEvent<HTMLButtonElement>;
}) => void;

export type DateTimePropOnChangeRange<TYPE> = TYPE extends СapableRangeType
  ? (props: {
      value: DateRange;
      e: React.MouseEvent<HTMLButtonElement>;
    }) => void
  : never;

type LocaleWords = {
  words?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
};

export type DateTimePropLocale = Locale & LocaleWords;

export const moveTypes = ['year', 'month', 'day', 'time'] as const;
export type MoveType = typeof moveTypes[number];

type DateTimePropTimeFor<TYPE> = TYPE extends 'date-time'
  ? 'start' | 'end'
  : never;

export type DateTimeProps<TYPE extends DateTimePropType = 'date'> =
  PropsWithHTMLAttributesAndRef<
    {
      currentVisibleDate?: Date;
      type?: TYPE;
      value?: DateTimePropValue<TYPE>;
      onChange?: DateTimePropOnChange;
      onChangeRange?: DateTimePropOnChangeRange<TYPE>;
      minDate?: Date;
      maxDate?: Date;
      events?: Date[];
      view?: TYPE extends СapableRangeType ? DateTimePropView : 'classic';
      locale?: DateTimePropLocale;
      children?: never;
      disableDates?: DateTimePropDisableDates;
      onChangeCurrentVisibleDate?: (date: Date) => void;
      multiplicitySeconds?: number;
      multiplicityMinutes?: number;
      multiplicityHours?: number;
      onMove?: (type: MoveType) => void;
      timeFor?: DateTimePropTimeFor<TYPE>;
    },
    HTMLDivElement
  >;

export type DateTimeComponent = <TYPE extends DateTimePropType = 'date'>(
  props: DateTimeProps<TYPE>,
) => React.ReactElement | null;

export type DateTimeTypeComponent<TYPE extends DateTimePropType> = (
  props: Omit<DateTimeProps<TYPE>, 'type'>,
) => React.ReactElement | null;

export type HandleSelectDate = (props: {
  value: Date;
  e: React.MouseEvent<HTMLButtonElement>;
}) => void;
