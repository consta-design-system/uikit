import './DatePickerFieldTypeDateRange.css';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';

import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { DatePickerFieldTypeDate } from '../DatePickerFieldTypeDate/DatePickerFieldTypeDate';
import { datePickerErrorTypes } from '../helpers';

import { DatePickerFieldTypeDateRangeProps, mapFormForEnd, mapFormForStart } from './helpers';

const cnDatePickerFieldTypeDateRange = cn('DatePickerFieldTypeDateRange');

export const DatePickerFieldTypeDateRange = forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateRangeProps
>((props, ref) => {
  const {
    className,
    form = 'default',
    startFieldInputRef,
    startFieldLeftSide,
    startFieldRightSide,
    endFieldInputRef,
    endFieldLeftSide,
    endFieldRightSide,
    value = [],
    onChange,
    onError,
    name,
    disabled,
    size,
    view,
    status,
    autoFocus,
    placeholder,
    readOnly,
    required,
    tabIndex,
    ariaLabel,
    iconSize,
    format,
    separator,
    minDate,
    maxDate,
    startFieldOnBlur,
    startFieldOnFocus,
    endFieldOnBlur,
    endFieldOnFocus,
    startFieldRef,
    endFieldRef,
    startFocused,
    endFocused,
    label,
    labelPosition,
    caption,
    width,
    ...otherProps
  } = props;

  const commonProps = {
    className: cnDatePickerFieldTypeDateRange('Field'),
    disabled,
    name,
    onError,
    size,
    view,
    status,
    autoFocus,
    placeholder,
    readOnly,
    required,
    tabIndex,
    ariaLabel,
    iconSize,
    format,
    separator,
    minDate,
    maxDate,
  };

  const [startDate, setStartDate] = useState<Date | undefined | null>(value?.[0]);
  const [endDate, setEndDate] = useState<Date | undefined | null>(value?.[1]);
  const eventRef = useRef<Event>();

  const handleChange = (
    e: Event,
    ownStartDate: Date | undefined | null,
    ownEndDate: Date | undefined | null,
  ) => {
    const start = ownStartDate || startDate;
    const end = ownEndDate || endDate;

    if (!onChange) {
      return;
    }

    if (start && end) {
      if (isBefore(start, end) || isEqual(start, end)) {
        onChange({ e, value: [start, end] });
        return;
      }
      onChange({ e, value: [start, undefined] });
      onError && onError({ type: datePickerErrorTypes[2], date: [start, end] });
      return;
    }

    if (start) {
      onChange({ e, value: [start, undefined] });
      return;
    }

    if (end) {
      onChange({ e, value: [undefined, end] });
      return;
    }

    onChange({ e, value: null });
  };

  const handleStartDateChange = (props: { e: Event; value: Date | null }) => {
    if (props.value?.getTime() === startDate?.getTime()) {
      return;
    }
    eventRef.current = props.e;
    setStartDate(props.value);
  };

  const handleEndDateChange = (props: { e: Event; value: Date | null }) => {
    if (props.value?.getTime() === endDate?.getTime()) {
      return;
    }
    eventRef.current = props.e;
    setEndDate(props.value);
  };

  useEffect(() => {
    if (eventRef.current) {
      handleChange(eventRef.current, startDate, endDate);
    }
  }, [eventRef.current]);

  useEffect(() => {
    setStartDate(value?.[0]);
  }, [value?.[0]?.getTime()]);

  useEffect(() => {
    setEndDate(value?.[1]);
  }, [value?.[1]?.getTime()]);

  return (
    <div
      {...otherProps}
      className={cnDatePickerFieldTypeDateRange({ view, labelPosition, width, size }, [className])}
      ref={ref}
    >
      {label && (
        <FieldLabel
          required={required}
          className={cnDatePickerFieldTypeDateRange('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnDatePickerFieldTypeDateRange('Body')}>
        <div className={cnDatePickerFieldTypeDateRange('Fields')}>
          <DatePickerFieldTypeDate
            {...commonProps}
            inputRef={startFieldInputRef}
            ref={startFieldRef}
            leftSide={startFieldLeftSide}
            rightSide={startFieldRightSide}
            form={getByMap(mapFormForStart, form)}
            value={startDate}
            onChange={handleStartDateChange}
            onFocus={startFieldOnFocus}
            onBlur={startFieldOnBlur}
            focused={startFocused}
          />
          <DatePickerFieldTypeDate
            {...commonProps}
            inputRef={endFieldInputRef}
            ref={endFieldRef}
            leftSide={endFieldLeftSide}
            rightSide={endFieldRightSide}
            form={getByMap(mapFormForEnd, form)}
            value={endDate}
            onChange={handleEndDateChange}
            onFocus={endFieldOnFocus}
            onBlur={endFieldOnBlur}
            focused={endFocused}
          />
        </div>
        {caption && (
          <FieldCaption className={cnDatePickerFieldTypeDateRange('Caption')} status={status}>
            {caption}
          </FieldCaption>
        )}
      </div>
    </div>
  );
});
