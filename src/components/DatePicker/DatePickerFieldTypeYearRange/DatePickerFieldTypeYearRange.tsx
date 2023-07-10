import React, { forwardRef } from 'react';

import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { DatePickerFieldTypeYear } from '../DatePickerFieldTypeYear/DatePickerFieldTypeYear';
import { cnDatePickerMixRangeField } from '../DatePickerMixRangeField/DatePickerMixRangeField';
import { getChangeFnRange } from '../getChangeFnRange';
import { getFormForEnd, getFormForStart } from '../helpers';
import { DatePickerFieldTypeYearRangeProps } from './helpers';

export const DatePickerFieldTypeYearRange = forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeYearRangeProps
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
    id,
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
          required={required}
          as="label"
          htmlFor={id}
          className={cnDatePickerMixRangeField('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnDatePickerMixRangeField('Body')}>
        <div className={cnDatePickerMixRangeField('Fields')}>
          <DatePickerFieldTypeYear
            {...commonProps}
            id={id}
            inputRef={startFieldInputRef}
            ref={startFieldRef}
            leftSide={startFieldLeftSide}
            rightSide={startFieldRightSide}
            form={getFormForStart(form)}
            value={value?.[0]}
            onChange={handleStartDateChange}
            onFocus={startFieldOnFocus}
            onBlur={startFieldOnBlur}
            focused={startFocused}
            name={startFieldName}
          />
          <DatePickerFieldTypeYear
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
