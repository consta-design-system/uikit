import './DateTime.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';

import { DateTimeViewOneMonth } from './DateTimeViewOneMonth/DateTimeViewOneMonth';
import { DateTimeViewSlider } from './DateTimeViewSlider/DateTimeViewSlider';
import { DateTimeViewTwoMonths } from './DateTimeViewTwoMonths/DateTimeViewTwoMonths';
import {
  DateTimeComponent,
  DateTimePropView,
  dateTimePropViewDefault,
  DateTimeViewComponent,
} from './helpers/types';

export const cnDateTime = cn('DateTime');

const viewMap: Record<DateTimePropView, DateTimeViewComponent> = {
  classic: DateTimeViewOneMonth,
  book: DateTimeViewTwoMonths,
  slider: DateTimeViewSlider,
};

export const DateTime: DateTimeComponent = React.forwardRef((props, ref) => {
  const { view = dateTimePropViewDefault, className, ...otherProps } = props;

  const ViewComponent = getSizeByMap(viewMap, view);

  return <ViewComponent {...otherProps} ref={ref} className={cnDateTime(null, [className])} />;
});

export * from './DateTimeCell/DateTimeCell';
export * from './DateTimeItem/DateTimeItem';
export * from './DateTimeMonth/DateTimeMonth';
export * from './DateTimeLabel/DateTimeLabel';
export * from './DateTimeLabel/DateTimeLabel';
export * from './DateTimeSlider/DateTimeSlider';
export * from './DateTimeViewOneMonth/DateTimeViewOneMonth';
export * from './DateTimeViewSlider/DateTimeViewSlider';
export * from './DateTimeViewTwoMonths/DateTimeViewTwoMonths';
export * from './DateTime10Years/DateTime10Years';
export * from './DateTimeYear/DateTimeYear';
export * from './DateTimeTime/DateTimeTime';
export * from './DateTimeYearSlider/DateTimeYearSlider';
export * from './DateTime10YearSlider/DateTime10YearSlider';
export * from './DateTime100YearSlider/DateTime100YearSlider';
export * from './DateTimeTypeYear/DateTimeTypeYear';
export * from './DateTimeTypeMonth/DateTimeTypeMonth';
export * from './DateTimeTypeDate/DateTimeTypeDate';
