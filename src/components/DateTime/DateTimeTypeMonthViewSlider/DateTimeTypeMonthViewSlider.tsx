import React from 'react';
import { addYears, startOfYear } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTime10YearSlider } from '../DateTime10YearSlider/DateTime10YearSlider';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeTypeYearViewSlider } from '../DateTimeTypeYearViewSlider/DateTimeTypeYearViewSlider';
import {
  DateTimeTypeViewComponent,
  getHandleSelectDate,
  getMonthsOfYear,
  getYearTitle,
  isEqualMount,
  useCurrentVisibleDate,
} from '../helpers';
import { cnDateTimeMixViewSlider } from '../mixs';

export const DateTimeTypeMonthViewSlider: DateTimeTypeViewComponent = React.forwardRef(
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

    if (changeYear) {
      return (
        <DateTimeTypeYearViewSlider
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
      <div {...otherProps} className={cnDateTimeMixViewSlider(null, [className])} ref={ref}>
        <DateTime10YearSlider
          className={cnDateTimeMixViewSlider('Slider')}
          currentVisibleDate={currentVisibleDate}
          onChange={setCurrentVisibleDate}
          value={value}
          locale={locale}
        />
        <div className={cnDateTimeMixViewSlider('PageWrapper')}>
          <div className={cnDateTimeMixViewSlider('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixViewSlider('Label')}
              label={pageOneLabel}
              onClick={on}
              cursor="pointer"
            />
            <DateTime10Years years={pageOneYearsOfDecade} />
          </div>
          <div className={cnDateTimeMixViewSlider('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixViewSlider('Label')}
              label={pageTwoLabel}
              onClick={on}
              cursor="pointer"
            />
            <DateTime10Years years={pageTwoYearsOfDecade} />
          </div>
        </div>
      </div>
    );
  },
);
