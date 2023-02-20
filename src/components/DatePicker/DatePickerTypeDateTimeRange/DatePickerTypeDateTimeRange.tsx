import startOfMonth from 'date-fns/startOfMonth';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTimeRange } from '../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';
import {
  getDropdownZIndex,
  getFieldName,
  normalizeRangeValue,
} from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';
import { useDropdownVisible } from '../useDropdownVisible';

export const DatePickerTypeDateTimeRange: DatePickerTypeComponent<'date-time-range'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      onFocus,
      onBlur,
      leftSide,
      rightSide,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      inputRef,
      name,
      multiplicityMinutes,
      dropdownClassName,
      multiplicitySeconds,
      multiplicityHours,
      ...fieldProps
    } = props;

    const startFieldRef = useRef<HTMLDivElement>(null);
    const endFieldRef = useRef<HTMLDivElement>(null);
    const startFieldInputRef = useRef<HTMLInputElement>(null);
    const endFieldInputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const {
      calendarVisible,
      blocks: {
        start: { onFocus: onStartFocus, onBlur: onStartBlur },
        dropdown: { onBlur: onDropdownBlur, onFocus: onDropdownFocus },
        end: { onFocus: onEndFocus, onBlur: onEndBlur },
      },
      close,
      fieldType,
    } = useDropdownVisible(onFocus, onBlur);

    const startFocused = fieldType === 'start';
    const endFocused = fieldType === 'end';

    const hadleChange: DatePickerDropdownPropOnChange = ({ e, value }) => {
      if (startFocused) {
        props.onChange?.({
          e,
          value: normalizeRangeValue([value, props?.value?.[1]]),
        });
      }
      if (endFocused) {
        props.onChange?.({
          e,
          value: normalizeRangeValue([props?.value?.[0], value]),
        });
      }
    };

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate: props.maxDate,
      minDate: props.minDate,
      value: props.value,
      startOfUnit: startOfMonth,
      onChangeCurrentVisibleDate,
      calendarVisible,
    });

    // эфект для того чтобы календарь переключался при вводе с клавиатуры
    useEffect(() => {
      if (props.value?.[0] && startFocused) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && endFocused) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[1]?.getTime(), calendarVisible, endFocused]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [startFieldRef, endFieldRef, calendarRef],
      handler: close,
    });

    return (
      <>
        <DatePickerFieldTypeDateTimeRange
          {...fieldProps}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldInputRef={useForkRef([startFieldInputRef, inputRef?.[0]])}
          endFieldInputRef={useForkRef([endFieldInputRef, inputRef?.[1]])}
          startFieldOnFocus={onStartFocus}
          endFieldOnFocus={onEndFocus}
          startFieldLeftSide={
            Array.isArray(leftSide) ? leftSide?.[0] : leftSide
          }
          startFieldRightSide={
            Array.isArray(rightSide) ? rightSide?.[0] : undefined
          }
          endFieldLeftSide={Array.isArray(leftSide) ? leftSide?.[1] : undefined}
          endFieldRightSide={
            Array.isArray(rightSide) ? rightSide?.[1] : rightSide
          }
          startFieldOnBlur={onStartBlur}
          endFieldOnBlur={onEndBlur}
          startFocused={startFocused}
          endFocused={endFocused}
          startFieldName={getFieldName(name, 0)}
          endFieldName={getFieldName(name, 1)}
        />
        <DatePickerDropdown
          type="date-time"
          ref={calendarRef}
          anchorRef={startFieldRef}
          isOpen={calendarVisible}
          className={dropdownClassName}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          currentVisibleDate={currentVisibleDate}
          value={props.value || undefined}
          onFocus={onDropdownFocus}
          onBlur={onDropdownBlur}
          timeFor={fieldType || undefined}
          view={dateTimeView}
          events={events}
          locale={locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          onChange={hadleChange}
          renderAdditionalControls={renderAdditionalControls}
          multiplicityMinutes={multiplicityMinutes}
          multiplicitySeconds={multiplicitySeconds}
          multiplicityHours={multiplicityHours}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  });
