import React, { forwardRef } from 'react';

import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { DatePickerFieldTypeMonth } from '../DatePickerFieldTypeMonth/DatePickerFieldTypeMonth';
import { cnDatePickerMixRangeField } from '../DatePickerMixRangeField/DatePickerMixRangeField';
import { getChangeFnRange } from '../getChangeFnRange';
import { getFormForEnd, getFormForStart } from '../helpers';
import { DatePickerFieldTypeMonthRangeProps } from './helpers';

export const DatePickerFieldTypeMonthRange = forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeMonthRangeProps
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
    startFieldName,
    endFieldName,
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
    id,
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
    labelIcon,
    labelPosition,
    caption,
    width,
    withClearButton,
    ...otherProps
  } = props;

  const commonProps = {
    className: cnDatePickerMixRangeField('Field'),
    disabled,
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
    withClearButton,
  };

  const [handleStartDateChange, handleEndDateChange] = getChangeFnRange(
    onChange,
    onError,
    value,
  );

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
          icon={labelIcon}
          as="label"
          htmlFor={id}
          required={required}
          className={cnDatePickerMixRangeField('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnDatePickerMixRangeField('Body')}>
        <div className={cnDatePickerMixRangeField('Fields')}>
          <DatePickerFieldTypeMonth
            {...commonProps}
            inputRef={startFieldInputRef}
            ref={startFieldRef}
            leftSide={startFieldLeftSide}
            rightSide={startFieldRightSide}
            form={getFormForStart(form)}
            value={value?.[0]}
            onChange={handleStartDateChange}
            id={id}
            onFocus={startFieldOnFocus}
            onBlur={startFieldOnBlur}
            focused={startFocused}
            name={startFieldName}
          />
          <DatePickerFieldTypeMonth
            {...commonProps}
            name={endFieldName}
            inputRef={endFieldInputRef}
            ref={endFieldRef}
            leftSide={endFieldLeftSide}
            rightSide={endFieldRightSide}
            form={getFormForEnd(form)}
            value={value?.[1]}
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
