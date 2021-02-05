import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  Locale,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { range } from '../../utils/array';
import { isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined, isNotNil } from '../../utils/type-guards';
import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { CalendarCellPropRange } from './CalendarСell/CalendarСell';

export const calendarPropView = ['oneMount', 'twoMounts', 'slider'] as const;
export type CalendarPropView = typeof calendarPropView[number];
export const calendarPropViewDefault: CalendarPropView = calendarPropView[0];

export const calendarPropType = ['date', 'date-range'] as const;
export type CalendarPropType = typeof calendarPropType[number];
export const calendarPropTypeDefault: CalendarPropType = calendarPropType[0];

export type CalendarPropValue<TYPE extends CalendarPropType> = TYPE extends 'date'
  ? Date
  : DateRange;

export type CalendarPropOnChange<TYPE extends CalendarPropType> = (props: {
  value: CalendarPropValue<TYPE>;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type CalendarProps<TYPE extends CalendarPropType> = PropsWithHTMLAttributesAndRef<
  {
    currentVisibleDate?: Date;
    type?: TYPE;
    value?: CalendarPropValue<TYPE>;
    onChange?: CalendarPropOnChange<TYPE>;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: CalendarPropView;
    locale?: Locale;
  },
  HTMLDivElement
>;

export type CalendarComponent = <TYPE extends CalendarPropType>(
  props: CalendarProps<TYPE>,
) => React.ReactElement | null;

export type CalendarViewComponent = <TYPE extends CalendarPropType>(
  props: Omit<CalendarProps<TYPE>, 'view'>,
) => React.ReactElement | null;

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): { start: Date; end: Date } => {
  const [start, end] = [date1, date2].sort(dateComparer);

  return { start, end };
};

export const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const { start, end } = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? date.getTime() === item.getTime() : false));
  }

  return date.getTime() === value.getTime();
};

const isDateInRange = (date: Date, range: DateRange): CalendarCellPropRange => {
  if (!range[0] || !range[1]) {
    return false;
  }

  const dateTime = date.getTime();
  const rangeTime = [range[0].getTime(), range[1].getTime()];

  if (dateTime === rangeTime[0]) {
    return 'first';
  }

  if (dateTime === rangeTime[1]) {
    return 'last';
  }

  if (dateTime > rangeTime[0] && dateTime < rangeTime[1]) {
    return true;
  }

  return false;
};

const hasEvent = (date: Date, events: Date[]): boolean =>
  !!events.find((eventDate) => startOfDay(eventDate).getTime() === date.getTime());

const isToday = (date: Date): boolean => startOfDay(new Date()).getTime() === date.getTime();

const isWithInIntervalMinMaxDade = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const minDateTime = minDate?.getTime();
  const maxDateTime = maxDate?.getTime();

  if (minDate && maxDate && minDateTime && maxDateTime) {
    return minDateTime < maxDateTime
      ? isWithinInterval(date, { start: minDate, end: maxDate })
      : false;
  }

  const dateTime = date.getTime();

  if (minDateTime && !maxDateTime) {
    return minDateTime < dateTime;
  }

  if (!minDateTime && maxDateTime) {
    return maxDateTime > dateTime;
  }

  return true;
};

export const getDaysOfMount = (props: {
  date: Date;
  locale: Locale;
  handleDayClick?: HandleSelectDate;
  value?: Date | DateRange;
  events?: Date[];
  minDate?: Date;
  maxDate?: Date;
}): {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  number: string;
  selected?: boolean;
  range?: CalendarCellPropRange;
  event?: boolean;
  today?: boolean;
}[] => {
  const { date, locale, handleDayClick, value, events, minDate, maxDate } = props;
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { locale });
  const endDate = endOfWeek(endOfMonth(date), { locale });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return range(diffDays).map((index) => {
    const date = addDays(startDate, index);
    const number = format(date, 'd');

    if (date.getMonth() === currentMonth) {
      return {
        number,
        onClick: handleDayClick ? (e) => handleDayClick({ e, value: date }) : undefined,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value),
        event: events && hasEvent(date, events),
        today: isToday(date),
        disabled: !isWithInIntervalMinMaxDade(date, minDate, maxDate),
      };
    }

    return {
      number,
      disabled: true,
    };
  });
};

type getHandleSelectDateProps<TYPE extends CalendarPropType> = {
  type: TYPE;
  value?: CalendarPropValue<TYPE>;
  onChange?: CalendarPropOnChange<TYPE>;
  minDate?: Date;
  maxDate?: Date;
};

type HandleSelectDate = (props: { value: Date; e: React.MouseEvent<HTMLDivElement> }) => void;

type getHandleSelectDate = <TYPE extends CalendarPropType>(
  props: getHandleSelectDateProps<TYPE>,
) => HandleSelectDate;

export const getHandleSelectDate: getHandleSelectDate = ({
  type,
  value: valueProp,
  minDate,
  maxDate,
  onChange: onChangeProp,
}) => {
  let handleSelectDate: HandleSelectDate;
  if (type === 'date-range') {
    handleSelectDate = ({ value: date, e }) => {
      // Привел к типам так как TS не понимает что при указанном `type`
      // календаря всегда будет падать определенный тип `value`
      const onChange = onChangeProp as CalendarPropOnChange<'date-range'>;
      const value = (valueProp || []) as CalendarPropValue<'date-range'>;

      if (minDate && maxDate) {
        if (!isWithinInterval(date, { start: minDate, end: maxDate }) || !isNotNil(value)) {
          return;
        }
      }

      if (!isOnlyOneDateInRange(value)) {
        return onChange({ e, value: [date, undefined] });
      }

      const [startDate, endDate] = value;

      if (isDefined(startDate)) {
        if (startDate.getTime() === date.getTime()) {
          return;
        }
        return onChange({ e, value: startDate > date ? [date, startDate] : [startDate, date] });
      }

      if (isDefined(endDate)) {
        if (endDate.getTime() === date.getTime()) {
          return;
        }
        return onChange({ e, value: endDate > date ? [date, endDate] : [endDate, date] });
      }
    };
  } else {
    const onChange = onChangeProp as CalendarPropOnChange<'date'>;

    handleSelectDate = (props) => {
      if (!isWithInIntervalMinMaxDade(props.value, minDate, maxDate)) {
        return;
      }

      return onChange(props);
    };
  }

  return handleSelectDate;
};

export const getMonthTitle = (date: Date, locale: Locale): string => {
  return format(date, 'LLLL', { locale });
};

export const getMouthLabelWithYear = (date: Date, locale: Locale): string => {
  return `${getMonthTitle(date, locale)} ${date.getFullYear()}`;
};

export const getDaysOfWeek = (locale: Locale): string[] => {
  const now = new Date();
  return eachDayOfInterval({
    start: startOfWeek(now, { locale }),
    end: endOfWeek(now, { locale }),
  }).map((date) => format(date, 'EEEEEE', { locale }));
};
