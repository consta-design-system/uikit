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
import { useCalendarVisible } from '../useCalendarVisible';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeYear: DatePickerTypeComponent<'year'> = forwardRef(
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
      disabled,
      ignoreOutsideClicksRefs,
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
      ignoreClicksInsideRefs: [
        fieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeYear
          {...otherProps}
          ref={fieldRef}
          inputRef={inputRef}
          disabled={disabled}
          onClick={setCalendarVisible.on}
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
          minDate={props.minDate}
          maxDate={props.maxDate}
          currentVisibleDate={currentVisibleDate}
          form={dropdownForm}
          onChange={(...args) => {
            props.onChange?.(...args);
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
