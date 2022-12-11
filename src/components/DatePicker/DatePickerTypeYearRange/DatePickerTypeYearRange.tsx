import { addYears, startOfDecade } from 'date-fns';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeYearRange } from '../DatePickerFieldTypeYearRange/DatePickerFieldTypeYearRange';
import { getDropdownZIndex, normalizeRangeValue } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeYearRange: DatePickerTypeComponent<'date-range'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      onFocus,
      onBlur,
      dropdownClassName,
      leftSide,
      rightSide,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      inputRef,
      name,
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
      startOfUnit: startOfDecade,
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
      if (props.value?.[0] && dateTimeView === 'classic' && startFocused) {
        const newVisibleDate = startOfDecade(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[0] && dateTimeView !== 'classic' && startFocused) {
        const newVisibleDate = startOfDecade(props.value[0]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 10).getTime())
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && dateTimeView === 'classic' && endFocused) {
        const newVisibleDate = startOfDecade(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[1] && dateTimeView !== 'classic' && endFocused) {
        const newVisibleDate = startOfDecade(props.value[1]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 10).getTime())
        ) {
          setCurrentVisibleDate(addYears(newVisibleDate, -10));
        }
      }
    }, [props.value?.[1]?.getTime(), calendarVisible, endFocused]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [startFieldRef, endFieldRef, calendarRef],
      handler: () => {
        setFieldFocused(false);
        setCalendarVisible.off();
      },
    });

    return (
      <>
        <DatePickerFieldTypeYearRange
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
          startFieldName={Array.isArray(name) ? name[0] : `${name}_start`}
          endFieldName={Array.isArray(name) ? name[1] : `${name}_end`}
        />
        <DatePickerDropdown
          type="year"
          ref={calendarRef}
          anchorRef={startFieldRef}
          isOpen={calendarVisible}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          currentVisibleDate={currentVisibleDate}
          value={props.value || undefined}
          view={dateTimeView}
          events={events}
          locale={locale}
          className={dropdownClassName}
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          onChange={hadleChange}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={getDropdownZIndex(props.style)}
        />
      </>
    );
  });
