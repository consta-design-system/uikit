import React from 'react';
import { addYears, startOfYear } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeYearViewBook } from '../DateTimeTypeYearViewBook/DateTimeTypeYearViewBook';
import {
  DateTimeTypeViewComponent,
  getHandleSelectDate,
  getMonthsOfYear,
  getYearTitle,
  isEqualMount,
  useCurrentVisibleDate,
} from '../helpers';
import { cnDateTimeMixViewBook } from '../mixs';

export const DateTimeTypeMonthViewBook: DateTimeTypeViewComponent = React.forwardRef(
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

    const [changeYear, { on, off }] = useFlag();

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate,
      minDate,
      value,
      startOfUnit: startOfYear,
    });

    const pageTwoCurrentVisibleDate = addYears(currentVisibleDate, 1);

    const handleSelectDate = getHandleSelectDate({
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      isEqualUnit: isEqualMount,
    });

    const pageOneYearsOfDecade = getMonthsOfYear({
      date: currentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageTwoYearsOfDecade = getMonthsOfYear({
      date: pageTwoCurrentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageOneLabel = getYearTitle(currentVisibleDate);
    const pageTwoLabel = getYearTitle(pageTwoCurrentVisibleDate);

    const handleNext = () => setCurrentVisibleDate(pageTwoCurrentVisibleDate);
    const handlePrev = () => setCurrentVisibleDate(addYears(currentVisibleDate, -1));

    if (changeYear) {
      return (
        <DateTimeTypeYearViewBook
          {...otherProps}
          ref={ref}
          className={className}
          currentVisibleDate={currentVisibleDate}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          events={events}
          onChange={({ value }) => {
            setCurrentVisibleDate(value);
            off();
          }}
        />
      );
    }

    return (
      <div {...otherProps} className={cnDateTimeMixViewBook(null, [className])} ref={ref}>
        <div className={cnDateTimeMixViewBook('Page')}>
          <DateTimeToggler
            className={cnDateTimeMixViewBook('Label')}
            prevOnClick={handlePrev}
            label={pageOneLabel}
            onLabelClick={on}
          />
          <DateTime10Years years={pageOneYearsOfDecade} />
        </div>
        <div className={cnDateTimeMixViewBook('Page')}>
          <DateTimeToggler
            className={cnDateTimeMixViewBook('Label')}
            nextOnClick={handleNext}
            label={pageTwoLabel}
            onLabelClick={on}
          />
          <DateTime10Years years={pageTwoYearsOfDecade} />
        </div>
      </div>
    );
  },
);
