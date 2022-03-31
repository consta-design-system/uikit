import React, { useEffect, useRef } from 'react';
import {
  addHours,
  addMinutes,
  addSeconds,
  format,
  isValid,
  parse,
  startOfDay,
  startOfHour,
  startOfMinute,
} from 'date-fns';
import IMask from 'imask';

import { IconComponent, IconPropSize } from '../../../icons/Icon/Icon';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { getLabelHours, getLabelMinutes, getLabelSeconds } from '../../DateTimeCanary/helpers';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import {
  datePickerErrorTypes,
  datePickerPropFormatTypeTime,
  DatePickerPropOnError,
  getPartsDate,
  getTimeEnum,
} from '../helpers';

type DatePickerFieldTypeTimePropOnChange = (props: { e: Event; value: Date | null }) => void;

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
    caption?: string;
    labelPosition?: 'top' | 'left';
  },
  HTMLDivElement
>;

export const useImask = (
  formatProp: string,
  separator: string,
  multiplicityHours: number | undefined,
  multiplicitySeconds: number | undefined,
  multiplicityMinutes: number | undefined,
  inputRef: React.RefObject<HTMLInputElement>,
  stringValue: string | null,
  onError: DatePickerPropOnError | undefined,
) => {
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedDateOptions> | null>(null);

  // задаем маску и сохраняем обьект маски в ref
  // обнавляем при смене формата
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    imaskRef.current = (IMask(inputRef.current, {
      mask: Date,
      pattern: formatProp,
      blocks: {
        HH:
          multiplicityHours && multiplicityHours > 1
            ? {
                mask: IMask.MaskedEnum,
                enum: getTimeEnum(24, multiplicityHours, startOfDay, addHours, getLabelHours),
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
      format: (date) => format(date, formatProp),
      parse: (string) => parse(string, formatProp, new Date()),
      validate: (string: string) => {
        const [HH, mm, ss] = getPartsDate(string, formatProp, ':', false, ['HH', 'mm', 'ss']);

        if (
          HH &&
          mm &&
          ss &&
          !isValid(parse(`${HH}:${mm}:${ss}`, datePickerPropFormatTypeTime, new Date()))
        ) {
          onError?.({
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
    }) as unknown) as IMask.InputMask<IMask.MaskedDateOptions>;
  }, [formatProp, separator, multiplicityHours, multiplicitySeconds, multiplicityMinutes]);

  // Нужно для синхранизации value c Imask,
  // так как value мы можем задать через пропс без самого ввода,
  // и Imask требует ручной синхронихации в этом случае
  useEffect(() => {
    imaskRef.current?.updateValue();
  }, [stringValue]);
};
