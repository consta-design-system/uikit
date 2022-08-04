import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { DatePickerFieldTypeDateTime } from '../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';
import { cnDatePickerMixRangeField } from '../DatePickerMixRangeField/DatePickerMixRangeField';
import {
  datePickerErrorTypes,
  getFormForEnd,
  getFormForStart,
} from '../helpers';
import { DatePickerFieldTypeDateTimeRangeProps } from './helpers';

export const DatePickerFieldTypeDateTimeRange = forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateTimeRangeProps
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
    className: cnDatePickerMixRangeField('Field'),
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

  const [startDate, setStartDate] = useState<Date | undefined | null>(
    value?.[0],
  );
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
      className={cnDatePickerMixRangeField(
        { view, labelPosition, width, size },
        [className],
      )}
      ref={ref}
    >
      {label && (
        <FieldLabel
          required={required}
          className={cnDatePickerMixRangeField('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnDatePickerMixRangeField('Body')}>
        <div className={cnDatePickerMixRangeField('Fields')}>
          <DatePickerFieldTypeDateTime
            {...commonProps}
            inputRef={startFieldInputRef}
            ref={startFieldRef}
            leftSide={startFieldLeftSide}
            rightSide={startFieldRightSide}
            form={getFormForStart(form)}
            value={startDate}
            onChange={handleStartDateChange}
            onFocus={startFieldOnFocus}
            onBlur={startFieldOnBlur}
            focused={startFocused}
          />
          <DatePickerFieldTypeDateTime
            {...commonProps}
            inputRef={endFieldInputRef}
            ref={endFieldRef}
            leftSide={endFieldLeftSide}
            rightSide={endFieldRightSide}
            form={getFormForEnd(form)}
            value={endDate}
            onChange={handleEndDateChange}
            onFocus={endFieldOnFocus}
            onBlur={endFieldOnBlur}
            focused={endFocused}
          />
        </div>
        {caption && (
          <FieldCaption
            className={cnDatePickerMixRangeField('Caption')}
            status={status}
          >
            {caption}
          </FieldCaption>
        )}
      </div>
    </div>
  );
});
