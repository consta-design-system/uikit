import React from 'react';

import { TextField } from '##/components/TextField';
import { useForkRef } from '##/hooks/useForkRef';
import { maxDateDefault, minDateDefault } from '##/utils/date';

import {
  datePickerPropFormatTypeYear,
  datePickerPropSeparatorDefault,
  placeholderByFormat,
} from '../helpers';
import { DatePickerFieldTypeYearProps, usePicker } from './helpers';

export const DatePickerFieldTypeYear = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeYearProps
>((props, ref) => {
  const {
    format = datePickerPropFormatTypeYear,
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
    value,
    minDate,
    maxDate,
    onChange,
    onError,
    separator,
    format,
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
