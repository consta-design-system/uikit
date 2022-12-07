import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTime } from '../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';
import {
  datePickerPropFormatTypeDateTime,
  getDropdownZIndex,
  getMultiplicityTime,
} from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeDateTime: DatePickerTypeComponent<'date-time'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      onFocus,
      dropdownClassName,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      multiplicityHours: multiplicityHoursProp,
      multiplicityMinutes: multiplicityMinutesProp,
      multiplicitySeconds: multiplicitySecondsProp,
      renderAdditionalControls,
      ...otherProps
    } = props;

    const [multiplicityHours, multiplicityMinutes, multiplicitySeconds] =
      getMultiplicityTime(
        otherProps.format || datePickerPropFormatTypeDateTime,
        multiplicityHoursProp,
        multiplicityMinutesProp,
        multiplicitySecondsProp,
      );

    const fieldRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [calendarVisible, setCalendarVisible] = useFlag(false);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate: props.maxDate,
      minDate: props.minDate,
      value: props.value,
      startOfUnit: startOfMonth,
      onChangeCurrentVisibleDate,
      calendarVisible,
    });

    const onFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      onFocus && onFocus(e);
      setCalendarVisible.on();
    };

    useEffect(() => {
      if (ref) {
        setRef(ref, fieldRef.current);
      }
    }, [ref, fieldRef]);

    useEffect(() => {
      if (props.value && dateTimeView === 'classic' && currentVisibleDate) {
        const newVisibleDate = startOfMonth(props.value);
        if (newVisibleDate.getTime() !== currentVisibleDate.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value && dateTimeView !== 'classic' && currentVisibleDate) {
        const newVisibleDate = startOfMonth(props.value);
        if (
          newVisibleDate.getTime() !== currentVisibleDate.getTime() &&
          newVisibleDate.getTime() !==
            addMonths(currentVisibleDate, 1).getTime()
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [fieldRef, calendarRef],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeDateTime
          {...otherProps}
          ref={fieldRef}
          onFocus={onFocusHandler}
          multiplicityHours={multiplicityHours}
          multiplicitySeconds={multiplicitySeconds}
          multiplicityMinutes={multiplicityMinutes}
        />
        <DatePickerDropdown
          ref={calendarRef}
          anchorRef={fieldRef}
          isOpen={calendarVisible}
          value={props.value || undefined}
          type="date-time"
          view={dateTimeView}
          events={events}
          className={dropdownClassName}
          locale={locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={props.onChange}
          renderAdditionalControls={renderAdditionalControls}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          multiplicityHours={multiplicityHours}
          multiplicitySeconds={multiplicitySeconds}
          multiplicityMinutes={multiplicityMinutes}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  });
