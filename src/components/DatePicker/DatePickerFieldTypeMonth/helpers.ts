import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import { format, isValid, isWithinInterval, parse } from 'date-fns';
import { MaskedDate } from 'imask';
import { useCallback, useEffect } from 'react';
import { IMask, ReactMaskOpts, useIMask } from 'react-imask';

import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
} from '##/components/TextField';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import {
  datePickerPropSeparatorDefault,
  getPartDate,
  getParts,
  getPartsDate,
} from '../helpers';
import { datePickerErrorTypes, DatePickerPropOnError } from '../types';

type DatePickerFieldTypeMonthPropOnChange = (
  value: Date | null,
  props: {
    e: Event;
  },
) => void;

export type DatePickerFieldTypeMonthProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeMonthPropOnChange;
    onError?: DatePickerPropOnError;
    id?: string;
    name?: string;
    disabled?: boolean;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    status?: TextFieldPropStatus;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    format?: string;
    separator?: string;
    minDate?: Date;
    maxDate?: Date;
    focused?: boolean;
    label?: string;
    labelIcon?: IconComponent;
    caption?: string;
    labelPosition?: 'top' | 'left';
    withClearButton?: boolean;
  },
  HTMLDivElement
>;

type UsePickerProps = {
  value?: Date | null;
  onChange?: DatePickerFieldTypeMonthPropOnChange;
  onError?: DatePickerPropOnError;
  format: string;
  separator: string;
  minDate: Date;
  maxDate: Date;
};

export const usePicker = (props: UsePickerProps) => {
  const {
    value,
    onChange,
    onError,
    format: formatProp,
    separator,
    maxDate,
    minDate,
  } = props;
  const onChangeRef = useMutableRef(onChange);
  const valueRef = useMutableRef(value);
  const onErrorRef = useMutableRef(onError);

  const onAccept = useCallback(
    (stringValue: string, maskRef: unknown, e: InputEvent | undefined) => {
      const onChange = onChangeRef.current;
      const value = valueRef.current;

      if (
        value &&
        isValid(value) &&
        format(value, formatProp) === stringValue
      ) {
        return;
      }

      if (stringValue?.length !== formatProp.length && value && e && onChange) {
        onChange(null, { e });
        return;
      }

      if (onChange && e) {
        if (!stringValue) {
          if (value) {
            onChange(null, { e });
          }
          return;
        }

        const formatArray = getParts(formatProp, separator, false);
        const valueArray = getParts(stringValue, separator, false);
        const validArray = formatArray
          .map((marker) => getPartDate(formatArray, valueArray, marker))
          .filter((item) => Boolean(item));

        if (formatArray.length === validArray.length) {
          const date = parse(
            valueArray.join(datePickerPropSeparatorDefault),
            formatArray.join(datePickerPropSeparatorDefault),
            new Date(),
          );
          if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
            const [MM, yyyy] = getPartsDate(
              stringValue,
              formatProp,
              separator,
              false,
              ['MM', 'yyyy'],
            );
            onErrorRef.current?.({
              type: datePickerErrorTypes[0],
              stringValue,
              MM,
              yyyy,
              date,
            });
            if (value) {
              onChange(null, { e });
            }
            return;
          }
          onChange(date, { e });
        } else if (value) {
          onChange(null, { e });
        }
      }
    },
    [minDate?.getTime(), maxDate?.getTime(), formatProp, separator],
  );

  const { ref, setValue: setStringValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >(
    {
      mask: Date as unknown as MaskedDate,
      pattern: formatProp,
      blocks: {
        yyyy: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 9999,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
      },
      lazy: true,
      autofix: true,
      format: (date: Date) => format(date, formatProp),
      parse: (string: string) => parse(string, formatProp, new Date()),
      validate: (string: string) => {
        const formatArray = getParts(formatProp, separator, false);
        const valueArray = getParts(string, separator, false);
        const validArray = formatArray
          .map((marker) => getPartDate(formatArray, valueArray, marker))
          .filter((item) => Boolean(item));

        if (
          formatArray.length === validArray.length &&
          !isValid(
            parse(
              valueArray.join(datePickerPropSeparatorDefault),
              formatArray.join(datePickerPropSeparatorDefault),
              new Date(),
            ),
          )
        ) {
          const [MM, yyyy] = getPartsDate(
            string,
            formatProp,
            separator,
            false,
            ['MM', 'yyyy'],
          );

          onErrorRef.current?.({
            type: datePickerErrorTypes[1],
            stringValue: string,
            MM,
            yyyy,
          });
          return false;
        }

        return true;
      },
    },
    { onAccept },
  );

  // при изменении value, нужно обновить stringValue
  useEffect(() => {
    if (value && isValid(value)) {
      setStringValue(format(value, formatProp));
    }
  }, [value?.getTime()]);

  return ref;
};
