import { addYears, startOfDecade } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React, { forwardRef, useEffect } from 'react';

import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTime100YearSlider } from '../DateTime100YearSlider/DateTime100YearSlider';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import {
  DateTimeTypeComponent,
  getDecadeTitle,
  getHandleSelectDate,
  getYearsOfDecade,
  isEqualYear,
  moveTypes,
  useCurrentVisibleDate,
} from '../helpers';
import { dateTimePropView, dateTimePropViewDefault } from '../helpers/types';
import { cnDateTimeMixLayout } from '../mixs';

export const DateTimeTypeYear: DateTimeTypeComponent<'year'> = forwardRef(
  (props, ref) => {
    const {
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      disableDates,
      currentVisibleDate: currentVisibleDateProp,
      events,
      locale = ruLocale,
      className,
      view = dateTimePropViewDefault,
      onMove,
      onChangeCurrentVisibleDate,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
      ...otherProps
    } = props;

    useEffect(() => {
      onMove?.(moveTypes[0]);
    }, []);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate,
      minDate,
      value,
      startOfUnit: startOfDecade,
      onChangeCurrentVisibleDate,
    });

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
      disableDates,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageOneLabel = getDecadeTitle(currentVisibleDate);

    const handleNext = () =>
      setCurrentVisibleDate(addYears(currentVisibleDate, 10));
    const handlePrev = () =>
      setCurrentVisibleDate(addYears(currentVisibleDate, -10));

    if (view === dateTimePropView[0]) {
      return (
        <div
          {...otherProps}
          className={cnDateTimeMixLayout({ view }, [className])}
          ref={ref}
        >
          <DateTimeToggler
            className={cnDateTimeMixLayout('Label')}
            prevOnClick={handlePrev}
            nextOnClick={handleNext}
            label={pageOneLabel}
          />
          <DateTime10Years years={pageOneYearsOfDecade} />
        </div>
      );
    }

    const pageTwoCurrentVisibleDate = addYears(currentVisibleDate, 10);

    const pageTwoYearsOfDecade = getYearsOfDecade({
      date: pageTwoCurrentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageTwoLabel = getDecadeTitle(pageTwoCurrentVisibleDate);

    if (view === dateTimePropView[1]) {
      return (
        <div
          {...otherProps}
          className={cnDateTimeMixLayout({ view }, [className])}
          ref={ref}
        >
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              prevOnClick={handlePrev}
              label={pageOneLabel}
            />
            <DateTime10Years years={pageOneYearsOfDecade} />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              nextOnClick={handleNext}
              label={pageTwoLabel}
            />
            <DateTime10Years years={pageTwoYearsOfDecade} />
          </div>
        </div>
      );
    }

    return (
      <div
        {...otherProps}
        className={cnDateTimeMixLayout({ view }, [className])}
        ref={ref}
      >
        <DateTime100YearSlider
          className={cnDateTimeMixLayout('Slider')}
          currentVisibleDate={currentVisibleDate}
          onChange={setCurrentVisibleDate}
          value={value}
          locale={locale}
        />
        <div className={cnDateTimeMixLayout('PageWrapper')}>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixLayout('Label')}
              label={pageOneLabel}
            />
            <DateTime10Years years={pageOneYearsOfDecade} />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixLayout('Label')}
              label={pageTwoLabel}
            />
            <DateTime10Years years={pageTwoYearsOfDecade} />
          </div>
        </div>
      </div>
    );
  },
);
