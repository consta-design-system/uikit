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
  DateTimePropViewDefault,
  DateTimeViewComponent,
} from './helpers';

export const cnDateTime = cn('DateTime');

const viewMap: Record<DateTimePropView, DateTimeViewComponent> = {
  oneMonth: DateTimeViewOneMonth,
  twoMonths: DateTimeViewTwoMonths,
  slider: DateTimeViewSlider,
};

export const DateTime: DateTimeComponent = React.forwardRef((props, ref) => {
  const { view = DateTimePropViewDefault, className, ...otherProps } = props;

  const ViewComponent = getSizeByMap(viewMap, view);

  return <ViewComponent {...otherProps} ref={ref} className={cnDateTime(null, [className])} />;
});

export * from './DateTimeCell/DateTimeCell';
export * from './DateTimeItem/DateTimeItem';
export * from './DateTimeMonth/DateTimeMonth';
export * from './DateTimeMonthLabel/DateTimeMonthLabel';
export * from './DateTimeMonthToggler/DateTimeMonthToggler';
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
