import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';

export const dateTimePropView = ['oneMonth', 'twoMonths', 'slider'] as const;
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
    locale?: Locale;
    children?: never;
    onChangeCurrentVisibleDate?: (date: Date) => void;
  },
  HTMLDivElement
>;

export type DateTimeComponent = (props: DateTimeProps) => React.ReactElement | null;

export type DateTimeViewComponent = (
  props: Omit<DateTimeProps, 'view'>,
) => React.ReactElement | null;

export type HandleSelectDate = (props: {
  value: Date;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;
