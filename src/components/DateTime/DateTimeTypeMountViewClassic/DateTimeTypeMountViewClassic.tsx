import React from 'react';
import { addYears, startOfYear } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeYearViewClassic } from '../DateTimeTypeYearViewClassic/DateTimeTypeYearViewClassic';
import { DateTimeYear } from '../DateTimeYear/DateTimeYear';
import {
  DateTimeViewComponent,
  getHandleSelectDate,
  getMonthsOfYear,
  getYearTitle,
  isEqualMount,
  useCurrentVisibleDate,
} from '../helpers';
import { cnDateTimeMixViewClassic } from '../mixs';

export const DateTimeTypeMountViewClassic: DateTimeViewComponent = React.forwardRef(
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

    const handleSelectDate = getHandleSelectDate({
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      isEqualUnit: isEqualMount,
    });

    const months = getMonthsOfYear({
      date: currentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const label = getYearTitle(currentVisibleDate);

    const handleNext = () => setCurrentVisibleDate(addYears(currentVisibleDate, 1));
    const handlePrev = () => setCurrentVisibleDate(addYears(currentVisibleDate, -1));

    if (changeYear) {
      return (
        <DateTimeTypeYearViewClassic
          {...otherProps}
          ref={ref}
          className={className}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          events={events}
          currentVisibleDate={currentVisibleDate}
          onChange={({ value }) => {
            setCurrentVisibleDate(value);
            off();
          }}
        />
      );
    }

    return (
      <div {...otherProps} className={cnDateTimeMixViewClassic(null, [className])} ref={ref}>
        <DateTimeToggler
          className={cnDateTimeMixViewClassic('Label')}
          prevOnClick={handlePrev}
          nextOnClick={handleNext}
          label={label}
          onLabelClick={on}
        />
        <DateTimeYear years={months} />
      </div>
    );
  },
);
