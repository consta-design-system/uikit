import { format, isValid, parse, startOfToday } from 'date-fns';
import { useCallback, useEffect } from 'react';
import { useIMask } from 'react-imask';

import { getForm } from '##/components/FieldGroup';
import { TextFieldPropForm } from '##/components/TextField';
import { useMutableRef } from '##/hooks/useMutableRef';
import { range } from '##/utils/array';
import { DateRange } from '##/utils/types/Date';

import { DatePickerPropType } from './types';

export const datePickerPropSeparatorDefault = '.';
export const datePickerPropFormatTypeDate = `dd${datePickerPropSeparatorDefault}MM${datePickerPropSeparatorDefault}yyyy`;
export const datePickerPropPlaceholderTypeDate = `ДД${datePickerPropSeparatorDefault}ММ${datePickerPropSeparatorDefault}ГГГГ`;

export const datePickerPropFormatTypeTime = `HH:mm:ss`;
export const datePickerPropPlaceholderTypeTime = `ЧЧ:ММ:СС`;

export const datePickerPropFormatTypeDateTime = `${datePickerPropFormatTypeDate} ${datePickerPropFormatTypeTime}`;
export const datePickerPropPlaceholderTypeDateTime = `${datePickerPropPlaceholderTypeDate} ${datePickerPropPlaceholderTypeTime}`;

export const datePickerPropFormatTypeYear = `yyyy`;
export const datePickerPropPlaceholderTypeYear = `ГГГГ`;

export const datePickerPropFormatTypeMonth = `MM${datePickerPropSeparatorDefault}yyyy`;
export const datePickerPropPlaceholderTypeMonth = `MM${datePickerPropSeparatorDefault}ГГГГ`;

export const normalizeRangeValue = (dateRange: DateRange): DateRange => {
  if (
    dateRange[0] &&
    dateRange[1] &&
    dateRange[0]?.getTime() > dateRange[1]?.getTime()
  ) {
    return [dateRange[1], dateRange[0]];
  }
  return dateRange;
};

export const getMultiplicityTime = (
  format: string,
  multiplicityHours: number | undefined,
  multiplicityMinutes: number | undefined,
  multiplicitySeconds: number | undefined,
) => {
  const markers = ['HH', 'mm', 'ss'] as const;
  const formatArray = format.split(' ')[1]?.split(':');
  const map = {
    HH: multiplicityHours,
    mm: multiplicityMinutes,
    ss: multiplicitySeconds,
  } as const;

  return markers.map((marker) =>
    formatArray?.indexOf(marker) < 0 ? 0 : map[marker],
  );
};

export const getTimeEnum = (
  length: number,
  multiplicity = 1,
  startOfUnits: (date: Date) => Date,
  addUnits: (date: Date, amount: number) => Date,
  getItemLabel: (date: Date) => string,
) => {
  const numbers = range(multiplicity ? Math.floor(length / multiplicity) : 0);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnits(startOfToday());

  return numbers.map((number) => {
    return getItemLabel(addUnits(startDate, number * multiplicity));
  });
};

export const getFormForStart = (form: TextFieldPropForm) => getForm(form, 0, 2);
export const getFormForEnd = (form: TextFieldPropForm) => getForm(form, 1, 2);

export const getPartDate = (
  formatArray: string[],
  stringArray: string[],
  marker: string,
) => {
  const index = formatArray.indexOf(marker);

  if (
    index >= 0 &&
    stringArray[index] &&
    stringArray[index].length === marker.length
  ) {
    return stringArray[index];
  }

  return undefined;
};

export const getParts = (
  format: string,
  separator: string,
  withTime?: boolean,
) => {
  if (withTime) {
    const [date, time] = format.split(' ');

    return [
      ...(date ? date.split(separator) : []),
      ...(time ? time.split(':') : []),
    ];
  }

  return format.split(separator);
};

export const getPartsDate = (
  value: string,
  format: string,
  separator: string,
  withTime: boolean,
  markers: string[],
) => {
  const formatArray = getParts(format, separator, withTime);
  const stringArray = getParts(value, separator, withTime);

  return markers.map((marker) => getPartDate(formatArray, stringArray, marker));
};

export const isTypeWithTime = (type: DatePickerPropType) =>
  type.indexOf('time') !== -1;

const fieldPrefixs = ['start', 'end'] as const;

export const getFieldName = (
  name: [string?, string?] | string | undefined,
  rangeIndex: 0 | 1,
) => {
  if (!name) {
    return undefined;
  }

  if (Array.isArray(name)) {
    return name[rangeIndex];
  }

  return `${name}_${fieldPrefixs[rangeIndex]}`;
};

export const getDropdownZIndex = (style?: React.CSSProperties) =>
  typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined;

type DatePickerFieldTypeDatePropOnChange = (
  value: Date | null,
  props: {
    e: Event;
  },
) => void;

export const useStringValue = (
  value: Date | undefined | null,
  formatProp: string,
  separator: string,
  onChangeRef: React.MutableRefObject<
    DatePickerFieldTypeDatePropOnChange | undefined
  >,
  imaskProps: ReturnType<typeof useIMask<HTMLInputElement>>,
) => {
  const stringValue = imaskProps.value;

  const refs = useMutableRef([imaskProps.setValue, value] as const);

  const setStringValueToNull = useCallback(() => {
    if (imaskProps.ref?.current && imaskProps.maskRef.current) {
      refs.current[0]('');
      imaskProps.ref.current.value = '';
      imaskProps.maskRef.current.updateValue();
    }
  }, []);

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setStringValueToNull();

      if (refs.current[1]) {
        onChangeRef.current?.(null, { e: e as unknown as Event });
      }
    },
    [],
  );

  useEffect(() => {
    if (value && isValid(value)) {
      refs.current[0](format(value, formatProp));
    }

    if (!value && stringValue) {
      const formatArray = getParts(formatProp, separator, false);
      const valueArray = getParts(stringValue, separator, false);
      const validArray = formatArray
        .map((marker) => getPartDate(formatArray, valueArray, marker))
        .filter((item) => Boolean(item));

      const date =
        formatArray.length === validArray.length
          ? parse(
              valueArray.join(datePickerPropSeparatorDefault),
              formatArray.join(datePickerPropSeparatorDefault),
              new Date(),
            )
          : undefined;

      if (isValid(date)) {
        setStringValueToNull();
      }
    }
  }, [value?.getTime()]);

  return handleClear;
};
