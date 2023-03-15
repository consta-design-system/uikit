import startOfMonth from 'date-fns/startOfMonth';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
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

    const [fieldFocused, setFieldFocused] = useState<'start' | 'end' | false>(
      false,
    );

    const startFocused = fieldFocused === 'start';
    const endFocused = fieldFocused === 'end';

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

    const startFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[0]?.(e) : onBlur?.(e);

    const endFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[1]?.(e) : onBlur?.(e);

    const startFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('start');
      setCalendarVisible.on();
      Array.isArray(onFocus) ? onFocus[0]?.(e) : onFocus?.(e);
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('end');
      setCalendarVisible.on();
      Array.isArray(onFocus) ? onFocus[1]?.(e) : onFocus?.(e);
    };

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
      handler: useCallback(() => {
        setFieldFocused(false);
        setCalendarVisible.off();
      }, []),
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
          startFieldOnFocus={startFieldOnFocusHandler}
          endFieldOnFocus={endFieldOnFocusHandler}
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
          startFieldOnBlur={startFieldOnBlurHandler}
          endFieldOnBlur={endFieldOnBlurHandler}
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
          timeFor={fieldFocused || undefined}
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
