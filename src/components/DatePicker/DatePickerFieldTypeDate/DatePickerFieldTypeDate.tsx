import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  datePickerPropFormatTypeDate,
  datePickerPropSeparatorDefault,
  placeholderByFormat,
} from '../helpers';
import { DatePickerFieldTypeDateProps, usePicker } from './helpers';

export const DatePickerFieldTypeDate = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeDateProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeDate,
    separator = datePickerPropSeparatorDefault,
    placeholder,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    defaultValue,
    ...otherProps
  } = props;

  const adaptedPlaceholder = placeholder ?? placeholderByFormat(format);

  const [inputRef, onClear] = usePicker({
    format,
    separator,
    onChange,
    onError,
    value,
    minDate,
    maxDate,
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
