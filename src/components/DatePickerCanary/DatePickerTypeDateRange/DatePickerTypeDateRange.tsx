import React, { forwardRef, useEffect, useRef, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateRange } from '../DatePickerFieldTypeDateRange/DatePickerFieldTypeDateRange';
import { DatePickerTypeComponent, normalizeRangeValue } from '../helpers';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeDateRange: DatePickerTypeComponent<'date-range'> = forwardRef(
  (props, ref) => {
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

    const [fieldFocused, setFieldFocused] = useState<'start' | 'end' | false>(false);

    const startFocused = fieldFocused === 'start';
    const endFocused = fieldFocused === 'end';

    const hadleChange: DatePickerDropdownPropOnChange = ({ e, value }) => {
      if (startFocused) {
        props.onChange?.({ e, value: normalizeRangeValue([value, props?.value?.[1]]) });
        endFieldInputRef.current?.focus();
      }
      if (endFocused) {
        props.onChange?.({ e, value: normalizeRangeValue([props?.value?.[0], value]) });
        startFieldInputRef.current?.focus();
      }
    };

    const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

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
      setCalendarVisible(true);
      onFocus && onFocus(e);
      startFieldOnFocus && startFieldOnFocus(e);
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused('end');
      setCalendarVisible(true);
      onFocus && onFocus(e);
      endFieldOnFocus && endFieldOnFocus(e);
    };

    // эфект для того чтобы календарь переключался при вводе с клавиатуры
    useEffect(() => {
      if (
        props.value?.[0] &&
        props.dateTimeView === 'classic' &&
        currentVisibleDate &&
        startFocused
      ) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (
        props.value?.[0] &&
        props.dateTimeView !== 'classic' &&
        currentVisibleDate &&
        startFocused
      ) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate.getTime() &&
          newVisibleDate.getTime() !== addMonths(currentVisibleDate, 1).getTime()
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]?.getTime(), calendarVisible]);

    useEffect(() => {
      if (
        props.value?.[1] &&
        props.dateTimeView === 'classic' &&
        currentVisibleDate &&
        endFocused
      ) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (
        props.value?.[1] &&
        props.dateTimeView !== 'classic' &&
        currentVisibleDate &&
        endFocused
      ) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate.getTime() &&
          newVisibleDate.getTime() !== addMonths(currentVisibleDate, 1).getTime()
        ) {
          setCurrentVisibleDate(addMonths(newVisibleDate, -1));
        }
      }
    }, [props.value?.[1]?.getTime(), calendarVisible]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [startFieldRef, endFieldRef, calendarRef],
      handler: () => {
        setFieldFocused(false);
        setCalendarVisible(false);
      },
    });

    return (
      <>
        <DatePickerFieldTypeDateRange
          {...fieldProps}
          style={style}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldInputRef={useForkRef([startFieldInputRef, startFieldInputRefProp])}
          endFieldInputRef={useForkRef([endFieldInputRef, endFieldInputRefProp])}
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
          type="date"
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
