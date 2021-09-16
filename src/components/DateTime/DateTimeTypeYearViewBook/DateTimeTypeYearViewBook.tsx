import React from 'react';
import { addYears, startOfDecade } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import {
  DateTimeTypeViewComponent,
  getDecadeTitle,
  getHandleSelectDate,
  getYearsOfDecade,
  isEqualYear,
  useCurrentVisibleDate,
} from '../helpers';
import { cnDateTimeMixViewBook } from '../mixs';

export const DateTimeTypeYearViewBook: DateTimeTypeViewComponent = React.forwardRef(
  (props, ref) => {
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
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageTwoYearsOfDecade = getYearsOfDecade({
      date: pageTwoCurrentVisibleDate,
      onChange: handleSelectDate,
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
      <div {...otherProps} className={cnDateTimeMixViewBook(null, [className])} ref={ref}>
        <div className={cnDateTimeMixViewBook('Page')}>
          <DateTimeToggler
            className={cnDateTimeMixViewBook('Label')}
            prevOnClick={handlePrev}
            label={pageOneLabel}
          />
          <DateTime10Years years={pageOneYearsOfDecade} />
        </div>
        <div className={cnDateTimeMixViewBook('Page')}>
          <DateTimeToggler
            className={cnDateTimeMixViewBook('Label')}
            nextOnClick={handleNext}
            label={pageTwoLabel}
          />
          <DateTime10Years years={pageTwoYearsOfDecade} />
        </div>
      </div>
    );
  },
);
