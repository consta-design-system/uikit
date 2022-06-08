import { useCallback, useEffect, useRef } from 'react';
import { format, isValid, parse } from 'date-fns';
import IMask from 'imask';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { IconComponent, IconPropSize } from '../../../icons/Icon/Icon';
import { leapYear } from '../../../utils/date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import {
  datePickerPropFormatTypeDate,
  datePickerPropSeparatorDefault,
  getPartsDate,
} from '../helpers';
import { datePickerErrorTypes, DatePickerPropOnError } from '../types';

type DatePickerFieldTypeDatePropOnChange = (props: { e: Event; value: Date | null }) => void;

export type DatePickerFieldTypeDateProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeDatePropOnChange;
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
    label?: string;
    caption?: string;
    labelPosition?: 'top' | 'left';
    withClearButton?: boolean;
  },
  HTMLDivElement
>;

export const useImask = (
  formatProp: string,
  separator: string,
  inputRef: React.RefObject<HTMLInputElement>,
  stringValue: string | null,
  onError: DatePickerPropOnError | undefined,
  handleChanhe: ({ e, value: stringValue }: { e: Event; value: string | null }) => void,
) => {
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedDateOptions> | null>(null);
  const onErrorRef = useMutableRef(onError);
  const handleChanheRef = useMutableRef(handleChanhe);

  // задаем маску и сохраняем обьект маски в ref
  // обнавляем при смене формата
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = (IMask(inputRef.current, {
        mask: Date,
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
          dd: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
          },
        },
        lazy: true,
        autofix: true,
        format: (date) => format(date, formatProp),
        parse: (string) => parse(string, formatProp, new Date()),
        validate: (string: string) => {
          const [dd, MM, yyyy] = getPartsDate(string, formatProp, separator, false, [
            'dd',
            'MM',
            'yyyy',
          ]);

          if (
            dd &&
            MM &&
            !isValid(
              parse(
                `${dd}${datePickerPropSeparatorDefault}${MM}${datePickerPropSeparatorDefault}${leapYear}`,
                datePickerPropFormatTypeDate,
                new Date(),
              ),
            )
          ) {
            onErrorRef.current?.({
              type: datePickerErrorTypes[1],
              stringValue: string,
              dd,
              MM,
              yyyy,
            });

            return false;
          }

          if (
            dd &&
            MM &&
            yyyy &&
            !isValid(
              parse(
                `${dd}${datePickerPropSeparatorDefault}${MM}${datePickerPropSeparatorDefault}${yyyy}`,
                datePickerPropFormatTypeDate,
                new Date(),
              ),
            )
          ) {
            onErrorRef.current?.({
              type: datePickerErrorTypes[1],
              stringValue: string,
              dd,
              MM,
              yyyy,
            });

            return false;
          }

          return true;
        },
        // проблема в типах IMask
      }) as unknown) as IMask.InputMask<IMask.MaskedDateOptions>;
    }
  }, [formatProp, separator]);

  // Нужно для синхранизации value c Imask,
  // так как value мы можем задать через пропс без самого ввода,
  // и Imask требует ручной синхронихации в этом случае
  const onAcept = useCallback((e: Event) => {
    handleChanheRef.current({ e, value: imaskRef.current?.value || null });
  }, []);

  useEffect(() => {
    imaskRef.current?.on('accept', onAcept);
    return () => {
      imaskRef.current?.off('accept', onAcept);
    };
  }, []);

  useEffect(() => {
    imaskRef.current?.updateValue();
  }, [stringValue]);
};
