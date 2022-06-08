import React, { useCallback, useEffect, useRef, useState } from 'react';
import { format, isValid, isWithinInterval, parse } from 'date-fns';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField, TextFieldPropOnChange } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeMonth,
  datePickerPropPlaceholderTypeMonth,
  datePickerPropSeparatorDefault,
  getPartsDate,
} from '../helpers';
import { datePickerErrorTypes } from '../types';

import { DatePickerFieldTypeMonthProps, useImask } from './helpers';

export const DatePickerFieldTypeMonth = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeMonthProps
>((props, ref) => {
  const {
    format: formatProp = datePickerPropFormatTypeMonth,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeMonth,
    onChange,
    onError,
    minDate = minDateDefault,
    maxDate = maxDateDefault,
    value,
    inputRef: inputRefProp,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useMutableRef(onChange);
  const onErrorRef = useMutableRef(onError);

  const [stringValue, setStringValue] = useState<string | null>(
    value && isValid(value) ? format(value, formatProp) : null,
  );

  const stringValueRef = useMutableRef(stringValue);
  const valueRef = useMutableRef(value);

  const handleChange = useCallback(
    ({ e, value: stringValue }: { e: Event; value: string | null }) => {
      if (stringValueRef.current === stringValue) {
        return;
      }

      setStringValue(stringValue);
      const onChange = onChangeRef.current;
      const value = valueRef.current;

      if (onChange) {
        if (!stringValue) {
          if (value) {
            onChange({ e, value: null });
          }
          return;
        }

        const [MM, yyyy] = getPartsDate(stringValue, formatProp, separator, false, ['MM', 'yyyy']);

        if (MM && yyyy) {
          const date = parse(
            `${MM}${datePickerPropSeparatorDefault}${yyyy}`,
            datePickerPropFormatTypeMonth,
            new Date(),
          );
          if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
            onErrorRef.current?.({
              type: datePickerErrorTypes[0],
              stringValue,
              MM,
              yyyy,
              date,
            });

            if (value) {
              onChange({ e, value: null });
            }
            return;
          }
          onChange({ e, value: date });
        } else if (value) {
          onChange({ e, value: null });
        }
      }
    },
    [minDate?.getTime(), maxDate?.getTime(), formatProp, separator],
  );

  useImask(formatProp, separator, inputRef, stringValue, onError, handleChange);

  // при изменении value, нужно обновить stringValue
  useEffect(() => {
    if (value && isValid(value)) {
      setStringValue(format(value, formatProp));
    } else if (stringValue?.length === formatProp.length) {
      // если количество введенных символов меньше чем в формате маски
      // то не нужно мешать вводу с клавиатуры
      // если дата была введена полностью и value пришел null,
      // то можно считать что поле нуждается в очистке
      setStringValue('');
    }
  }, [value?.getTime()]);

  return (
    <TextField
      {...otherProps}
      onChange={(handleChange as unknown) as TextFieldPropOnChange}
      type="text"
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      value={stringValue}
      placeholder={placeholder}
    />
  );
});
