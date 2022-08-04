import './Calendar.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { CalendarViewOneMonth } from './CalendarViewOneMonth/CalendarViewOneMonth';
import { CalendarViewSlider } from './CalendarViewSlider/CalendarViewSlider';
import { CalendarViewTwoMonths } from './CalendarViewTwoMonths/CalendarViewTwoMonths';
import {
  CalendarComponent,
  CalendarPropView,
  calendarPropViewDefault,
  CalendarViewComponent,
} from './helpers';

export const cnCalendar = cn('Calendar');

const viewMap: Record<CalendarPropView, CalendarViewComponent> = {
  oneMonth: CalendarViewOneMonth,
  twoMonths: CalendarViewTwoMonths,
  slider: CalendarViewSlider,
};

export const COMPONENT_NAME = 'Calendar' as const;

export const Calendar: CalendarComponent = React.forwardRef((props, ref) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const {
    view = calendarPropViewDefault,
    className,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, calendarRef);

  const ViewComponent = getByMap(viewMap, view);

  return (
    <ViewComponent
      {...otherProps}
      ref={useForkRef([ref, calendarRef])}
      className={cnCalendar(null, [className])}
    />
  );
});

export * from './CalendarCell/CalendarCell';
export * from './CalendarDay/CalendarDay';
export * from './CalendarMonth/CalendarMonth';
export * from './CalendarMonthLabel/CalendarMonthLabel';
export * from './CalendarMonthToggler/CalendarMonthToggler';
export * from './CalendarSlider/CalendarSlider';
export * from './CalendarViewOneMonth/CalendarViewOneMonth';
export * from './CalendarViewSlider/CalendarViewSlider';
export * from './CalendarViewTwoMonths/CalendarViewTwoMonths';
