import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import {
  addHours,
  addMinutes,
  addSeconds,
  format,
  isValid,
  isWithinInterval,
  parse,
  startOfDay,
  startOfHour,
  startOfMinute,
} from 'date-fns';
import IMask from 'imask';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useIMask } from '##/components/TextField';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
} from '../../DateTime/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import { getPartDate, getParts, getPartsDate, getTimeEnum } from '../helpers';
import { datePickerErrorTypes, DatePickerPropOnError } from '../types';

type DatePickerFieldTypeTimePropOnChange = (props: {
  e: Event;
  value: Date | null;
}) => void;

export type DatePickerFieldTypeTimeProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeTimePropOnChange;
    onError?: DatePickerPropOnError;
    id?: string;
    name?: string;
    disabled?: boolean;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    status?: TextFieldPropStatus;
    width?: TextFieldPropWidth;
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
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
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
  onChange?: DatePickerFieldTypeTimePropOnChange;
  onError?: DatePickerPropOnError;
  multiplicityHours: number | undefined;
  multiplicitySeconds: number | undefined;
  multiplicityMinutes: number | undefined;
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
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    format: formatProp,
    separator,
    maxDate,
    minDate,
  } = props;
  const onChangeRef = useMutableRef(onChange);
  const valueRef = useMutableRef(value);
  const onErrorRef = useMutableRef(onError);

  const [stringValue, setStringValue] = useState<string | null>(
    value && isValid(value) ? format(value, formatProp) : null,
  );
  const stringValueRef = useMutableRef(stringValue);

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

        const formatArray = getParts(formatProp, separator, false);
        const valueArray = getParts(stringValue, separator, false);
        const validArray = formatArray
          .map((marker) => getPartDate(formatArray, valueArray, marker))
          .filter((item) => Boolean(item));

        if (formatArray.length === validArray.length) {
          const date = parse(
            valueArray.join(':'),
            formatArray.join(':'),
            value || new Date(),
          );

          if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
            const [HH, mm, ss] = getPartsDate(
              stringValue,
              formatProp,
              ':',
              false,
              ['HH', 'mm', 'ss'],
            );

            onErrorRef.current?.({
              type: datePickerErrorTypes[0],
              stringValue,
              date,
              HH,
              mm,
              ss,
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

  const options: IMask.InputMask<IMask.MaskedDateOptions> = useMemo(
    () =>
      ({
        mask: Date,
        pattern: formatProp,
        blocks: {
          HH:
            multiplicityHours && multiplicityHours > 1
              ? {
                  mask: IMask.MaskedEnum,
                  enum: getTimeEnum(
                    24,
                    multiplicityHours,
                    startOfDay,
                    addHours,
                    getLabelHours,
                  ),
                }
              : {
                  mask: IMask.MaskedRange,
                  from: 0,
                  to: 23,
                },
          mm:
            multiplicityMinutes && multiplicityMinutes > 1
              ? {
                  mask: IMask.MaskedEnum,
                  enum: getTimeEnum(
                    60,
                    multiplicityMinutes,
                    startOfHour,
                    addMinutes,
                    getLabelMinutes,
                  ),
                }
              : {
                  mask: IMask.MaskedRange,
                  from: 0,
                  to: 59,
                },
          ss:
            multiplicitySeconds && multiplicitySeconds > 1
              ? {
                  mask: IMask.MaskedEnum,
                  enum: getTimeEnum(
                    60,
                    multiplicitySeconds,
                    startOfMinute,
                    addSeconds,
                    getLabelSeconds,
                  ),
                }
              : {
                  mask: IMask.MaskedRange,
                  from: 0,
                  to: 59,
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
              parse(valueArray.join(':'), formatArray.join(':'), new Date()),
            )
          ) {
            const [HH, mm, ss] = getPartsDate(string, formatProp, ':', false, [
              'HH',
              'mm',
              'ss',
            ]);

            onErrorRef.current?.({
              type: datePickerErrorTypes[1],
              stringValue: string,
              HH,
              mm,
              ss,
            });
            return false;
          }

          return true;
        },
        // проблема в типах IMask
      } as unknown as IMask.InputMask<IMask.MaskedDateOptions>),
    [
      formatProp,
      separator,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
    ],
  );

  const { inputRef } = useIMask({
    value: stringValue,
    onChange: (_val, params) => handleChange?.(params),
    maskOptions: options,
  });

  const clearValue = (e: Event) => {
    setStringValue(null);
    onChange?.({ e, value: null });
  };

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

  return {
    stringValue,
    inputRef,
    clearValue,
  };
};
