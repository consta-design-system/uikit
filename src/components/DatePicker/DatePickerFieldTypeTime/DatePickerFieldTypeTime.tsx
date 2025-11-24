import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  datePickerPropFormatTypeTime,
  datePickerPropPlaceholderTypeTime,
  datePickerPropSeparatorDefault,
  getAdaptedFormatByTimeOptions,
} from '../helpers';
import { DatePickerFieldTypeTimeProps, usePicker } from './helpers';

export const DatePickerFieldTypeTime = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeTimeProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeTime,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeTime,
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

  const adaptedFormat = getAdaptedFormatByTimeOptions(format, timeOptions);

  const adaptedPlaceholder = getAdaptedFormatByTimeOptions(
    placeholder,
    timeOptions,
  );

  const [inputRef, onClear] = usePicker({
    value,
    onChange,
    onError,
    separator,
    format: adaptedFormat,
    minDate,
    maxDate,
    timeOptions,
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
