import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeTime } from '../DatePickerFieldTypeTime/DatePickerFieldTypeTime';
import {
  datePickerPropFormatTypeDateTime,
  getDropdownZIndex,
  getMultiplicityTime,
} from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';

export const DatePickerTypeTime: DatePickerTypeComponent<'time'> = forwardRef(
  (props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      dropdownClassName,
      multiplicityHours: multiplicityHoursProp,
      multiplicityMinutes: multiplicityMinutesProp,
      multiplicitySeconds: multiplicitySecondsProp,
      renderAdditionalControls,
      currentVisibleDate,
      onChangeCurrentVisibleDate,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
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
    const inputRef = useRef<HTMLInputElement>(null);

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      startRef: inputRef,
    });

    useEffect(() => {
      if (ref) {
        setRef(ref, fieldRef.current);
      }
    }, [ref, fieldRef]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [
        fieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeTime
          {...otherProps}
          ref={fieldRef}
          inputRef={inputRef}
          onClick={setCalendarVisible.on}
          multiplicityHours={multiplicityHours}
          multiplicitySeconds={multiplicitySeconds}
          multiplicityMinutes={multiplicityMinutes}
        />
        <DatePickerDropdown
          ref={calendarRef}
          anchorRef={fieldRef}
          isOpen={calendarVisible}
          value={props.value || undefined}
          type="time"
          view={dateTimeView}
          events={events}
          locale={locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          className={dropdownClassName}
          onChange={props.onChange}
          renderAdditionalControls={renderAdditionalControls}
          multiplicityHours={multiplicityHours}
          multiplicitySeconds={multiplicitySeconds}
          multiplicityMinutes={multiplicityMinutes}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  },
);
