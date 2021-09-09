import './DateTimeTypeYearViewBook.css';

import React from 'react';
import { addYears, startOfDecade } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import {
  DateTimeViewComponent,
  getDecadeTitle,
  getHandleSelectDate,
  getYearsOfDecade,
  isEqualYear,
  useCurrentVisibleDate,
} from '../helpers';

const cnDateTimeTypeYearViewBook = cn('DateTimeTypeYearViewBook');

export const DateTimeTypeYearViewBook: DateTimeViewComponent = React.forwardRef((props, ref) => {
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

  const handleNext = () => setCurrentVisibleDate(pageTwoCurrentVisibleDate);
  const handlePrev = () => setCurrentVisibleDate(addYears(currentVisibleDate, -10));

  return (
    <div {...otherProps} className={cnDateTimeTypeYearViewBook(null, [className])} ref={ref}>
      <div className={cnDateTimeTypeYearViewBook('Page')}>
        <DateTimeToggler
          className={cnDateTimeTypeYearViewBook('Label')}
          prevOnClick={handlePrev}
          label={pageOneLabel}
        />
        <DateTime10Years years={pageOneYearsOfDecade} />
      </div>
      <div className={cnDateTimeTypeYearViewBook('Page')}>
        <DateTimeToggler
          className={cnDateTimeTypeYearViewBook('Label')}
          nextOnClick={handleNext}
          label={pageTwoLabel}
        />
        <DateTime10Years years={pageTwoYearsOfDecade} />
      </div>
    </div>
  );
});
