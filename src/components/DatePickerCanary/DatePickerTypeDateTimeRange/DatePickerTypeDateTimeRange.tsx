import startOfMonth from 'date-fns/startOfMonth';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTimeRange } from '../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';
import { DatePickerTypeComponent, normalizeRangeValue } from '../helpers';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeDateTimeRange: DatePickerTypeComponent<'date-time-range'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView,
      locale,
      dropdownForm,
      startFieldRightSide,
      startFieldLeftSide,
      startFieldOnBlur,
      startFieldOnFocus,
      endFieldRightSide,
      endFieldLeftSide,
      endFieldOnBlur,
      endFieldOnFocus,
      onFocus,
      onBlur,
      leftSide,
      rightSide,
      endFieldInputRef: endFieldInputRefProp,
      startFieldInputRef: startFieldInputRefProp,
      style,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate: onChangeCurrentVisibleDateProp,
      renderAdditionalControls,
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

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate(
      currentVisibleDateProp,
      onChangeCurrentVisibleDateProp,
    );

    const startFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
      onBlur && onBlur(e);
      startFieldOnBlur && startFieldOnBlur(e);
    };

    const endFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
      onBlur && onBlur(e);
      endFieldOnBlur && endFieldOnBlur(e);
    };

    const startFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('start');
      setCalendarVisible.on();
      onFocus && onFocus(e);
      startFieldOnFocus && startFieldOnFocus(e);
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('end');
      setCalendarVisible.on();
      onFocus && onFocus(e);
      endFieldOnFocus && endFieldOnFocus(e);
    };

    // эфект для того чтобы календарь переключался при вводе с клавиатуры
    useEffect(() => {
      if (props.value?.[0] && startFocused) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (!props.value?.[0] && startFocused) {
        setCurrentVisibleDate(currentVisibleDateProp);
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && endFocused) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
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
        <DatePickerFieldTypeDateTimeRange
          {...fieldProps}
          style={style}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldInputRef={useForkRef([
            startFieldInputRef,
            startFieldInputRefProp,
          ])}
          endFieldInputRef={useForkRef([
            endFieldInputRef,
            endFieldInputRefProp,
          ])}
          startFieldOnFocus={startFieldOnFocusHandler}
          endFieldOnFocus={endFieldOnFocusHandler}
          startFieldRightSide={startFieldRightSide}
          startFieldLeftSide={startFieldLeftSide || leftSide}
          endFieldRightSide={endFieldRightSide || rightSide}
          endFieldLeftSide={endFieldLeftSide}
          startFieldOnBlur={startFieldOnBlurHandler}
          endFieldOnBlur={endFieldOnBlurHandler}
          startFocused={startFocused}
          endFocused={endFocused}
        />
        <DatePickerDropdown
          type="date-time"
          ref={calendarRef}
          anchorRef={startFieldRef}
          isOpen={calendarVisible}
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
          zIndex={
            typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined
          }
        />
      </>
    );
  });
