import React, { useCallback, useEffect, useRef, useState } from 'react';
import { format, isValid, isWithinInterval, parse } from 'date-fns';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField, TextFieldPropOnChange } from '../../TextField/TextField';
import {
  datePickerPropFormatTypeYear,
  datePickerPropPlaceholderTypeYear,
  datePickerPropSeparatorDefault,
  getPartsDate,
} from '../helpers';
import { datePickerErrorTypes } from '../types';

import { DatePickerFieldTypeYearProps, useImask } from './helpers';

export const DatePickerFieldTypeYear = React.forwardRef<
  HTMLDivElement,
  DatePickerFieldTypeYearProps
>((props, ref) => {
  const {
    format: formatProp = datePickerPropFormatTypeYear,
    separator = datePickerPropSeparatorDefault,
    placeholder = datePickerPropPlaceholderTypeYear,
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

  const [stringValue, setStringValue] = useState<string | null>(
    value && isValid(value) ? format(value, formatProp) : null,
  );

  const stringValueRef = useMutableRef(stringValue);
  const valueRef = useMutableRef(value);
  const onErrorRef = useMutableRef(onError);

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

        const [yyyy] = getPartsDate(stringValue, formatProp, separator, false, ['yyyy']);

        if (yyyy) {
          const date = parse(`${yyyy}`, datePickerPropFormatTypeYear, new Date());
          if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
            onErrorRef.current?.({
              type: datePickerErrorTypes[0],
              stringValue,
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

  useImask(formatProp, separator, inputRef, stringValue, onError);

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
      type="text"
      onChange={(handleChange as unknown) as TextFieldPropOnChange}
      inputContainerRef={ref}
      inputRef={useForkRef([inputRef, inputRefProp])}
      value={stringValue}
      placeholder={placeholder}
    />
  );
});
