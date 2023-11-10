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
import React, { useCallback, useEffect } from 'react';
import { IMask, ReactMaskOpts, useIMask } from 'react-imask';

import {
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
} from '##/components/DateTime/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
} from '##/components/TextField/TextField';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import {
  datePickerPropSeparatorDefault,
  getPartDate,
  getParts,
  getPartsDate,
  getTimeEnum,
} from '../helpers';
import { datePickerErrorTypes, DatePickerPropOnError } from '../types';

type DatePickerFieldTypeDateTimePropOnChange = (
  value: Date | null,
  props: {
    e: Event;
  },
) => void;

export type DatePickerFieldTypeDateTimeProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeDateTimePropOnChange;
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
  onChange?: DatePickerFieldTypeDateTimePropOnChange;
  onError?: DatePickerPropOnError;
  format: string;
  separator: string;
  minDate: Date;
  maxDate: Date;
  multiplicityHours: number | undefined;
  multiplicitySeconds: number | undefined;
  multiplicityMinutes: number | undefined;
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
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
  } = props;
  const onChangeRef = useMutableRef(onChange);
  const valueRef = useMutableRef(value);
  const onErrorRef = useMutableRef(onError);

  const onComplete = useCallback(
    (stringValue: string, maskRef: unknown, e: Event) => {
      const onChange = onChangeRef.current;
      const value = valueRef.current;

      if (
        value &&
        isValid(value) &&
        format(value, formatProp) === stringValue
      ) {
        return;
      }

      if (onChange) {
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
            const [dd, MM, yyyy, HH, mm, ss] = getPartsDate(
              stringValue,
              formatProp,
              separator,
              true,
              ['dd', 'MM', 'yyyy', 'HH', 'mm', 'ss'],
            );

            onErrorRef.current?.({
              type: datePickerErrorTypes[0],
              stringValue,
              dd,
              MM,
              yyyy,
              date,
              HH,
              mm,
              ss,
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

  const onAccept = useCallback(
    (stringValue: string, maskRef: unknown, e: Event) => {
      if (stringValue?.length !== formatProp.length && valueRef.current) {
        onChangeRef.current?.({ e, value: null });
      }
    },
    [formatProp],
  );

  const { ref, setValue: setStringValue } = useIMask<
    HTMLInputElement,
    ReactMaskOpts
  >(
    {
      mask: Date,
      pattern: formatProp,
      blocks: {
        // @ts-ignore
        yyyy: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 9999,
        },
        // @ts-ignore
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        // @ts-ignore
        dd: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
        },
        HH:
          multiplicityHours && multiplicityHours > 1
            ? {
                mask: IMask.MaskedEnum,
                // @ts-ignore
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
                // @ts-ignore
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
                // @ts-ignore
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
            parse(
              valueArray.join(datePickerPropSeparatorDefault),
              formatArray.join(datePickerPropSeparatorDefault),
              new Date(),
            ),
          )
        ) {
          const [dd, MM, yyyy, HH, mm, ss] = getPartsDate(
            string,
            formatProp,
            separator,
            true,
            ['dd', 'MM', 'yyyy', 'HH', 'mm', 'ss'],
          );

          onErrorRef.current?.({
            type: datePickerErrorTypes[1],
            stringValue: string,
            dd,
            MM,
            yyyy,
            HH,
            mm,
            ss,
          });
          return false;
        }

        return true;
      },
    },
    { onAccept, onComplete },
  );

  // при изменении value, нужно обновить stringValue
  useEffect(() => {
    if (value && isValid(value)) {
      setStringValue(format(value, formatProp));
    }
  }, [value?.getTime()]);

  return ref;
};
