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
import { cnDateTimeMixViewClassic } from '../mixs';

export const DateTimeTypeYearViewClassic: DateTimeTypeViewComponent = React.forwardRef(
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

    const handleSelectDate = getHandleSelectDate({
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      isEqualUnit: isEqualYear,
    });

    const yearsOfDecade = getYearsOfDecade({
      date: currentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const label = getDecadeTitle(currentVisibleDate);

    const handleNext = () => setCurrentVisibleDate(addYears(currentVisibleDate, 10));
    const handlePrev = () => setCurrentVisibleDate(addYears(currentVisibleDate, -10));

    return (
      <div {...otherProps} className={cnDateTimeMixViewClassic(null, [className])} ref={ref}>
        <DateTimeToggler
          className={cnDateTimeMixViewClassic('Label')}
          prevOnClick={handlePrev}
          nextOnClick={handleNext}
          label={label}
        />
        <DateTime10Years years={yearsOfDecade} />
      </div>
    );
  },
);
