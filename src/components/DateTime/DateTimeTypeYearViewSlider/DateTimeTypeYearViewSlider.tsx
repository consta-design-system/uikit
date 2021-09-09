import './DateTimeTypeYearViewSlider.css';

import React from 'react';
import { addYears, startOfDecade } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTime100YearSlider } from '../DateTime100YearSlider/DateTime100YearSlider';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import {
  DateTimeViewComponent,
  getDecadeTitle,
  getHandleSelectDate,
  getYearsOfDecade,
  isEqualYear,
  useCurrentVisibleDate,
} from '../helpers';

const cnDateTimeTypeYearViewSlider = cn('DateTimeTypeYearViewSlider');

export const DateTimeTypeYearViewSlider: DateTimeViewComponent = React.forwardRef((props, ref) => {
  const {
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
    currentVisibleDate: currentVisibleDateProp,
    events,
    locale = ruLocale,
    className,
    ...otherProps
  } = props;

  const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
    currentVisibleDate: currentVisibleDateProp,
    maxDate,
    minDate,
    value,
    startOfUnit: startOfDecade,
  });

  const pageTwoCurrentVisibleDate = addYears(currentVisibleDate, 10);

  const handleSelectDate = getHandleSelectDate({
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
    isEqualUnit: isEqualYear,
  });

  const pageOneYearsOfDecade = getYearsOfDecade({
    date: currentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const pageTwoYearsOfDecade = getYearsOfDecade({
    date: pageTwoCurrentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const pageOneLabel = getDecadeTitle(currentVisibleDate);
  const pageTwoLabel = getDecadeTitle(pageTwoCurrentVisibleDate);

  return (
    <div {...otherProps} className={cnDateTimeTypeYearViewSlider(null, [className])} ref={ref}>
      <DateTime100YearSlider
        className={cnDateTimeTypeYearViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
        onChange={setCurrentVisibleDate}
        value={value}
        locale={locale}
      />
      <div className={cnDateTimeTypeYearViewSlider('PageWrapper')}>
        <div className={cnDateTimeTypeYearViewSlider('Page')}>
          <DateTimeLabel className={cnDateTimeTypeYearViewSlider('Label')} label={pageOneLabel} />
          <DateTime10Years years={pageOneYearsOfDecade} />
        </div>
        <div className={cnDateTimeTypeYearViewSlider('Page')}>
          <DateTimeLabel className={cnDateTimeTypeYearViewSlider('Label')} label={pageTwoLabel} />
          <DateTime10Years years={pageTwoYearsOfDecade} />
        </div>
      </div>
    </div>
  );
});
