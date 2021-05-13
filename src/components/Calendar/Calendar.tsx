import './Calendar.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';

import { CalendarViewOneMount } from './CalendarViewOneMount/CalendarViewOneMount';
import { CalendarViewSlider } from './CalendarViewSlider/CalendarViewSlider';
import { CalendarViewTwoMount } from './CalendarViewTwoMount/CalendarViewTwoMount';
import {
  CalendarComponent,
  CalendarPropView,
  calendarPropViewDefault,
  CalendarViewComponent,
} from './helpers';

export const cnCalendar = cn('Calendar');

const viewMap: Record<CalendarPropView, CalendarViewComponent> = {
  oneMount: CalendarViewOneMount,
  twoMounts: CalendarViewTwoMount,
  slider: CalendarViewSlider,
};

export const Calendar: CalendarComponent = React.forwardRef((props, ref) => {
  const { view = calendarPropViewDefault, className, ...otherProps } = props;

  const ViewComponent = getSizeByMap(viewMap, view);

  return <ViewComponent {...otherProps} ref={ref} className={cnCalendar(null, [className])} />;
});

export * from './CalendarСell/CalendarСell';
export * from './CalendarDay/CalendarDay';
export * from './CalendarMount/CalendarMount';
export * from './CalendarMountLabel/CalendarMountLabel';
export * from './CalendarMountToggler/CalendarMountToggler';
export * from './CalendarSlider/CalendarSlider';
export * from './CalendarViewOneMount/CalendarViewOneMount';
export * from './CalendarViewSlider/CalendarViewSlider';
export * from './CalendarViewTwoMount/CalendarViewTwoMount';
