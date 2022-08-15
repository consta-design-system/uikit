import { format, isValid, parse } from 'date-fns';
import IMask from 'imask';
import { useEffect, useRef } from 'react';

import { IconComponent, IconPropSize } from '../../../icons/Icon/Icon';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  TextFieldPropForm,
  TextFieldPropSize,
  TextFieldPropStatus,
  TextFieldPropView,
  TextFieldPropWidth,
} from '../../TextField/TextField';
import { datePickerPropFormatTypeYear, getPartsDate } from '../helpers';
import { datePickerErrorTypes, DatePickerPropOnError } from '../types';

type DatePickerFieldTypeYearPropOnChange = (props: {
  e: Event;
  value: Date | null;
}) => void;

export type DatePickerFieldTypeYearProps = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: Date | null;
    onChange?: DatePickerFieldTypeYearPropOnChange;
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
) => {
  const imaskRef = useRef<IMask.InputMask<IMask.MaskedDateOptions> | null>(
    null,
  );

  // задаем маску и сохраняем обьект маски в ref
  // обнавляем при смене формата
  useEffect(() => {
    if (inputRef.current) {
      imaskRef.current = IMask(inputRef.current, {
        mask: Date,
        pattern: formatProp,
        blocks: {
          yyyy: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 9999,
          },
        },
        lazy: true,
        autofix: true,
        format: (date) => format(date, formatProp),
        parse: (string) => parse(string, formatProp, new Date()),
        validate: (string: string) => {
          const [yyyy] = getPartsDate(string, formatProp, separator, false, [
            'yyyy',
          ]);

          if (
            yyyy &&
            !isValid(parse(`${yyyy}`, datePickerPropFormatTypeYear, new Date()))
          ) {
            onError &&
              onError({
                type: datePickerErrorTypes[1],
                stringValue: string,
                yyyy,
              });

            return false;
          }

          return true;
        },
        // проблема в типах IMask
      }) as unknown as IMask.InputMask<IMask.MaskedDateOptions>;
    }
  }, [formatProp, separator]);

  // Нужно для синхранизации value c Imask,
  // так как value мы можем задать через пропс без самого ввода,
  // и Imask требует ручной синхронихации в этом случае
  useEffect(() => {
    imaskRef.current?.updateValue();
  }, [stringValue]);
};
