import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  adaptFormat,
  datePickerPropFormatTypeDateTime,
  datePickerPropSeparatorDefault,
  placeholderByFormat,
} from '../helpers';
import { DatePickerFieldTypeDateTimeProps, usePicker } from './helpers';

export const DatePickerFieldTypeDateTime = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateTimeProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeDateTime,
    separator = datePickerPropSeparatorDefault,
    placeholder,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    timeOptions,
    defaultValue,
    ...otherProps
  } = props;

  const adaptedFormat = adaptFormat(format, timeOptions);

  const adaptedPlaceholder = placeholder ?? placeholderByFormat(adaptedFormat);

  const [inputRef, onClear] = usePicker({
    onChange,
    value,
    onError,
    maxDate,
    minDate,
    timeOptions,
    separator,
    format: adaptedFormat,
  });

  return (
    <TextField
      {...otherProps}
      type="text"
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      placeholder={adaptedPlaceholder}
      onClear={onClear}
    />
  );
});
