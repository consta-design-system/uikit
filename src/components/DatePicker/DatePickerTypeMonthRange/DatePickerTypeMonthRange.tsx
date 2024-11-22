import addYears from 'date-fns/addYears';
import startOfYear from 'date-fns/startOfYear';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '##/hooks/useClickOutside';
import { useForkRef } from '##/hooks/useForkRef';

import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeMonthRange } from '../DatePickerFieldTypeMonthRange/DatePickerFieldTypeMonthRange';
import { getDropdownZIndex, normalizeRangeValue } from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeMonthRange: DatePickerTypeComponent<'month-range'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      onFocus,
      dropdownClassName,
      dropdownRef,
      onBlur,
      leftSide,
      rightSide,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      inputRef,
      name,
      placeholder,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
      disabled,
      disableDates,
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

    const handleChange: DatePickerDropdownPropOnChange = (value, { e }) => {
      if (startFocused) {
        const newValue = normalizeRangeValue([value, props?.value?.[1]]);
        props.onChange?.(newValue, {
          e,
        });
      }
      if (endFocused) {
        const newValue = normalizeRangeValue([props?.value?.[0], value]);
        props.onChange?.(newValue, {
          e,
        });
      }
    };

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      disabled,
      startRef: startFieldInputRef,
      endRef: endFieldInputRef,
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

    const startFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[0]?.(e) : onBlur?.(e);

    const endFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[1]?.(e) : onBlur?.(e);

    const startFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('start');
      Array.isArray(onFocus) ? onFocus[0]?.(e) : onFocus?.(e);
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('end');
      Array.isArray(onFocus) ? onFocus[1]?.(e) : onFocus?.(e);
    };

    // эффект для того чтобы календарь переключался при вводе с клавиатуры
    useEffect(() => {
      if (props.value?.[0] && dateTimeView === 'classic' && startFocused) {
        const newVisibleDate = startOfYear(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[0] && dateTimeView !== 'classic' && startFocused) {
        const newVisibleDate = startOfYear(props.value[0]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 1).getTime())
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && dateTimeView === 'classic' && endFocused) {
        const newVisibleDate = startOfYear(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[1] && dateTimeView !== 'classic' && endFocused) {
        const newVisibleDate = startOfYear(props.value[1]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 1).getTime())
        ) {
          setCurrentVisibleDate(addYears(newVisibleDate, -1));
        }
      }
    }, [props.value?.[1]?.getTime(), calendarVisible, endFocused]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [
        startFieldRef,
        endFieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: useCallback(() => {
        setFieldFocused(false);
        setCalendarVisible.off();
      }, []),
    });

    return (
      <>
        <DatePickerFieldTypeMonthRange
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
          startFieldOnClick={setCalendarVisible.on}
          endFieldOnClick={setCalendarVisible.on}
          startFieldName={Array.isArray(name) ? name[0] : `${name}_start`}
          endFieldName={Array.isArray(name) ? name[1] : `${name}_end`}
          disabled={disabled}
          startFieldPlaceholder={
            Array.isArray(placeholder) ? placeholder?.[0] : placeholder
          }
          endFieldPlaceholder={
            Array.isArray(placeholder) ? placeholder?.[1] : placeholder
          }
        />
        <DatePickerDropdown
          type="month"
          ref={useForkRef([dropdownRef, calendarRef])}
          anchorRef={startFieldRef}
          isOpen={calendarVisible}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          currentVisibleDate={currentVisibleDate}
          value={props.value || undefined}
          view={dateTimeView}
          events={events}
          className={dropdownClassName}
          locale={locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          onChange={handleChange}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={getDropdownZIndex(props.style)}
          disableDates={disableDates}
        />
      </>
    );
  });
