import { addYears, startOfDecade } from 'date-fns';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeYear } from '../DatePickerFieldTypeYear/DatePickerFieldTypeYear';
import { getDropdownZIndex } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';
import { useDropdownVisible } from '../useDropdownVisible';

export const DatePickerTypeYear: DatePickerTypeComponent<'year'> = forwardRef(
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
      startOfUnit: startOfDecade,
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
        const newVisibleDate = startOfDecade(props.value);
        if (newVisibleDate.getTime() !== currentVisibleDate.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value && dateTimeView !== 'classic' && currentVisibleDate) {
        const newVisibleDate = startOfDecade(props.value);
        if (
          newVisibleDate.getTime() !== currentVisibleDate.getTime() &&
          newVisibleDate.getTime() !==
            addYears(currentVisibleDate, 10).getTime()
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
        <DatePickerFieldTypeYear
          {...otherProps}
          ref={fieldRef}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <DatePickerDropdown
          ref={calendarRef}
          anchorRef={fieldRef}
          className={dropdownClassName}
          isOpen={calendarVisible}
          value={props.value || undefined}
          type="year"
          view={dateTimeView}
          events={events}
          locale={locale}
          onFocus={onDropdownFocus}
          onBlur={onDropdownBlur}
          minDate={props.minDate}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={(params) => {
            props.onChange?.(params);
            close();
          }}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={getDropdownZIndex(props.style)}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
        />
      </>
    );
  },
);
