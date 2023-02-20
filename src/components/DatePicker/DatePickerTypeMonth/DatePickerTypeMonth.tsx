import addYears from 'date-fns/addYears';
import startOfYear from 'date-fns/startOfYear';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeMonth } from '../DatePickerFieldTypeMonth/DatePickerFieldTypeMonth';
import { getDropdownZIndex } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';
import { useDropdownVisible } from '../useDropdownVisible';

export const DatePickerTypeMonth: DatePickerTypeComponent<'month'> = forwardRef(
  (props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      dropdownClassName,
      onFocus,
      onBlur,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      ...otherProps
    } = props;

    const fieldRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const {
      calendarVisible,
      blocks: {
        start: { onFocus: onFocusHandler, onBlur: onBlurHandler },
        dropdown: { onBlur: onDropdownBlur, onFocus: onDropdownFocus },
      },
      close,
    } = useDropdownVisible(onFocus, onBlur);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate: props.maxDate,
      minDate: props.minDate,
      value: props.value,
      startOfUnit: startOfYear,
      onChangeCurrentVisibleDate,
      calendarVisible,
    });

    useEffect(() => {
      if (ref) {
        setRef(ref, fieldRef.current);
      }
    }, [ref, fieldRef]);

    useEffect(() => {
      if (props.value && dateTimeView === 'classic' && currentVisibleDate) {
        const newVisibleDate = startOfYear(props.value);
        if (newVisibleDate.getTime() !== currentVisibleDate.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value && dateTimeView !== 'classic' && currentVisibleDate) {
        const newVisibleDate = startOfYear(props.value);
        if (
          newVisibleDate.getTime() !== currentVisibleDate.getTime() &&
          newVisibleDate.getTime() !== addYears(currentVisibleDate, 1).getTime()
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [fieldRef, calendarRef],
      handler: close,
    });

    return (
      <>
        <DatePickerFieldTypeMonth
          {...otherProps}
          ref={fieldRef}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <DatePickerDropdown
          ref={calendarRef}
          anchorRef={fieldRef}
          isOpen={calendarVisible}
          value={props.value || undefined}
          type="month"
          view={dateTimeView}
          events={events}
          locale={locale}
          onFocus={onDropdownFocus}
          onBlur={onDropdownBlur}
          minDate={props.minDate}
          className={dropdownClassName}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={(params) => {
            props.onChange?.(params);
            close();
          }}
          renderAdditionalControls={renderAdditionalControls}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  },
);
