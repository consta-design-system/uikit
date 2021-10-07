import './DatePickerCalendar.css';

import React, { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  DateTime,
  DateTimePropOnChange,
  DateTimePropType,
} from '../../DateTimeCanary/DateTimeCanary';
import { Popover } from '../../Popover/Popover';
import {
  DatePickerPropCalendarForm,
  datePickerPropCalendarFormDefault,
  DatePickerPropCalendarView,
} from '../helpers';

export type DatePickerCalendarPropOnChange = DateTimePropOnChange;

export type DatePickerCalendarProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef: React.RefObject<HTMLElement>;
    currentVisibleDate?: Date;
    type?: DateTimePropType;
    value?: Date | DateRange;
    onChange?: DatePickerCalendarPropOnChange;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: DatePickerPropCalendarView;
    locale?: Locale;
    children?: never;
    form?: DatePickerPropCalendarForm;
    isOpen?: boolean;
    onChangeCurrentVisibleDate?: (date: Date) => void;
  },
  HTMLDivElement
>;

type DatePickerCalendarComponent = (props: DatePickerCalendarProps) => React.ReactElement | null;

const cnDatePickerCalendar = cn('DatePickerCalendar');
const cnDatePickerCalendarCssTransition = cnForCssTransition(cnDatePickerCalendar);

export const DatePickerCalendar: DatePickerCalendarComponent = forwardRef((props, ref) => {
  const {
    form = datePickerPropCalendarFormDefault,
    anchorRef,
    isOpen,
    value,
    className,
    onChange,
    ...otherProps
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnDatePickerCalendarCssTransition}
      timeout={200}
      nodeRef={rootRef}
    >
      <Popover
        ref={useForkRef([ref, rootRef])}
        anchorRef={anchorRef}
        className={cnDatePickerCalendar({ form }, [className])}
        direction="downStartLeft"
        spareDirection="downStartLeft"
        possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
      >
        <DateTime {...otherProps} onChange={onChange} type="date" value={value || undefined} />
      </Popover>
    </CSSTransition>
  );
});
