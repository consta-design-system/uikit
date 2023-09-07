import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDate } from '../DatePickerFieldTypeDate/DatePickerFieldTypeDate';
import { getDropdownZIndex } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeDate: DatePickerTypeComponent<'date'> = forwardRef(
  (props, ref) => {
    const {
      onChange,
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownClassName,
      dropdownForm,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
      ...otherProps
    } = props;

    const fieldRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      startRef: inputRef,
    });

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate: props.maxDate,
      minDate: props.minDate,
      value: props.value,
      startOfUnit: startOfMonth,
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
      ignoreClicksInsideRefs: [
        fieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeDate
          {...otherProps}
          ref={fieldRef}
          onChange={(date) => {
            onChange?.(date);
            setCalendarVisible.on();
          }}
          inputRef={inputRef}
          onClick={setCalendarVisible.on}
        />
        <DatePickerDropdown
          ref={calendarRef}
          anchorRef={fieldRef}
          isOpen={calendarVisible}
          value={props.value || undefined}
          type="date"
          view={dateTimeView}
          events={events}
          locale={locale}
          minDate={props.minDate}
          className={dropdownClassName}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={(params) => {
            props.onChange?.(params);
            setCalendarVisible.off();
          }}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={getDropdownZIndex(props.style)}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
        />
      </>
    );
  },
);
