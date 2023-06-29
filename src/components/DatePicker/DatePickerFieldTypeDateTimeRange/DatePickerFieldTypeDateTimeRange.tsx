import React, { forwardRef } from 'react';

import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { DatePickerFieldTypeDateTime } from '../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';
import { cnDatePickerMixRangeField } from '../DatePickerMixRangeField/DatePickerMixRangeField';
import { getChangeFnRange } from '../getChangeFnRange';
import { getFormForEnd, getFormForStart } from '../helpers';
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
    startFieldName,
    endFieldName,
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
          required={required}
          className={cnDatePickerMixRangeField('Label', { labelPosition })}
          size={size}
          htmlFor={id}
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
            id={id}
            form={getFormForStart(form)}
            value={value?.[0]}
            onChange={handleStartDateChange}
            onFocus={startFieldOnFocus}
            onBlur={startFieldOnBlur}
            focused={startFocused}
            autoFocus={autoFocus}
            name={startFieldName}
          />
          <DatePickerFieldTypeDateTime
            {...commonProps}
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
            name={endFieldName}
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
