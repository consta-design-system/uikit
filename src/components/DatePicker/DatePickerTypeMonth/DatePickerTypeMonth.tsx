import addYears from 'date-fns/addYears';
import startOfYear from 'date-fns/startOfYear';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '##/hooks/useClickOutside/useClickOutside';
import { useForkRef } from '##/hooks/useForkRef';
import { setRef } from '##/utils/setRef';

import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeMonth } from '../DatePickerFieldTypeMonth/DatePickerFieldTypeMonth';
import { getDropdownZIndex } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeMonth: DatePickerTypeComponent<'month'> = forwardRef(
  (props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      dropdownClassName,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
      disabled,
      inputRef: inputRefProp,
      ...otherProps
    } = props;

    const fieldRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      disabled,
      startRef: inputRef,
    });

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
      ignoreClicksInsideRefs: [
        fieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeMonth
          {...otherProps}
          ref={fieldRef}
          inputRef={useForkRef([inputRef, inputRefProp])}
          onClick={setCalendarVisible.on}
          disabled={disabled}
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
          minDate={props.minDate}
          className={dropdownClassName}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={(...args) => {
            props.onChange?.(...args);
            setCalendarVisible.off();
          }}
          renderAdditionalControls={renderAdditionalControls}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  },
);
