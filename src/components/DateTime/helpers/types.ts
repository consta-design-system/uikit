import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';

export const dateTimePropView = ['classic', 'book', 'slider'] as const;
export type DateTimePropView = typeof dateTimePropView[number];
export const dateTimePropViewDefault: DateTimePropView = dateTimePropView[0];

export const dateTimePropType = ['date'] as const;
export type DateTimePropType = typeof dateTimePropType[number];
export const dateTimePropTypeDefault: DateTimePropType = dateTimePropType[0];

export type DateTimePropValue = Date | DateRange;

export type DateTimePropOnChange = (props: {
  value: Date;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type DateTimePropOnChangeRange = (props: {
  value: DateRange;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type DateTimePropLocale = Locale & {
  words?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
};

export const moveTypes = ['year', 'month', 'day', 'time'] as const;
export type MoveType = typeof moveTypes[number];

export type DateTimeProps = PropsWithHTMLAttributesAndRef<
  {
    currentVisibleDate?: Date;
    type?: DateTimePropType;
    value?: DateTimePropValue;
    onChange?: DateTimePropOnChange;
    onChangeRange?: DateTimePropOnChangeRange;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: DateTimePropView;
    locale?: DateTimePropLocale;
    children?: never;
    onChangeCurrentVisibleDate?: (date: Date) => void;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
    onMove?: (type: MoveType) => void;
  },
  HTMLDivElement
>;

export type DateTimeComponent = (props: DateTimeProps) => React.ReactElement | null;

export type DateTimeViewComponent = (
  props: Omit<DateTimeProps, 'view'>,
) => React.ReactElement | null;

export type DateTimeTypeComponent = (
  props: Omit<DateTimeProps, 'type'>,
) => React.ReactElement | null;

export type HandleSelectDate = (props: {
  value: Date;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;
