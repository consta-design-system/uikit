import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { addYears, startOfDecade } from 'date-fns';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeYearRange } from '../DatePickerFieldTypeYearRange/DatePickerFieldTypeYearRange';
import { normalizeRangeValue } from '../helpers';
import { DatePickerTypeComponent } from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeYearRange: DatePickerTypeComponent<'date-range'> = forwardRef(
  (props, ref) => {
    const {
      events,
      dateTimeView,
      locale,
      dropdownForm,
      onFocus,
      onBlur,
      leftSide,
      rightSide,
      style,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate: onChangeCurrentVisibleDateProp,
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

    const [fieldFocused, setFieldFocused] = useState<'start' | 'end' | false>(false);

    const startFocused = fieldFocused === 'start';
    const endFocused = fieldFocused === 'end';

    const hadleChange: DatePickerDropdownPropOnChange = ({ e, value }) => {
      if (startFocused) {
        props.onChange?.({ e, value: normalizeRangeValue([value, props?.value?.[1]]) });
      }
      if (endFocused) {
        props.onChange?.({ e, value: normalizeRangeValue([props?.value?.[0], value]) });
      }
    };

    const [calendarVisible, setCalendarVisible] = useFlag(false);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate(
      currentVisibleDateProp,
      onChangeCurrentVisibleDateProp,
    );

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
      if (props.value?.[0] && props.dateTimeView === 'classic' && startFocused) {
        const newVisibleDate = startOfDecade(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[0] && props.dateTimeView !== 'classic' && startFocused) {
        const newVisibleDate = startOfDecade(props.value[0]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 10).getTime())
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (!props.value?.[0] && startFocused) {
        setCurrentVisibleDate(currentVisibleDateProp);
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && props.dateTimeView === 'classic' && endFocused) {
        const newVisibleDate = startOfDecade(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[1] && props.dateTimeView !== 'classic' && endFocused) {
        const newVisibleDate = startOfDecade(props.value[1]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addYears(currentVisibleDate, 10).getTime())
        ) {
          setCurrentVisibleDate(addYears(newVisibleDate, -10));
        }
        return;
      }
      if (!props.value?.[1] && endFocused) {
        setCurrentVisibleDate(currentVisibleDateProp);
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
          style={style}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldInputRef={useForkRef([startFieldInputRef, inputRef?.[0]])}
          endFieldInputRef={useForkRef([endFieldInputRef, inputRef?.[1]])}
          startFieldOnFocus={startFieldOnFocusHandler}
          endFieldOnFocus={endFieldOnFocusHandler}
          startFieldLeftSide={Array.isArray(leftSide) ? leftSide?.[0] : leftSide}
          startFieldRightSide={Array.isArray(rightSide) ? rightSide?.[0] : undefined}
          endFieldLeftSide={Array.isArray(leftSide) ? leftSide?.[1] : undefined}
          endFieldRightSide={Array.isArray(rightSide) ? rightSide?.[1] : rightSide}
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
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          onChange={hadleChange}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined}
        />
      </>
    );
  },
);
