import {
  addHours,
  addMinutes,
  addSeconds,
  format,
  isValid,
  parse,
  startOfToday,
} from 'date-fns';
import { useCallback, useEffect } from 'react';
import { IMask, useIMask } from 'react-imask';

import { getForm } from '##/components/FieldGroup';
import { TextFieldPropForm } from '##/components/TextField';
import { useMutableRef } from '##/hooks/useMutableRef';
import { DateRange } from '##/utils/types/Date';

import { TimeOptions, TimeUnitOptions } from '../DateTime';
import {
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
  getTimeNumbers,
} from '../DateTime/helpers';
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

export const getTimeOptionsByFormat = (
  format: string,
  timeOptions?: TimeOptions,
) => {
  const markers = ['HH', 'mm', 'ss'] as const;
  const formatArray = format.split(' ')[1]?.split(':');
  const mapTimeOptions = {
    HH: timeOptions?.hours,
    mm: timeOptions?.minutes,
    ss: timeOptions?.seconds,
  } as const;

  const [hoursOptions, minutesOptions, secondsOptions] = markers.map((marker) =>
    formatArray?.includes(marker) ? mapTimeOptions[marker] : [],
  ) as [
    TimeUnitOptions | undefined,
    TimeUnitOptions | undefined,
    TimeUnitOptions | undefined,
  ];

  const effectiveTimeOptions = {
    hours: hoursOptions,
    minutes: minutesOptions,
    seconds: secondsOptions,
  };

  return effectiveTimeOptions;
};

export const getAdaptedFormatByTimeOptions = (
  format: string,
  timeOptions?: TimeOptions,
): string => {
  const formatArray = format.split(' ');
  let adaptedFormat = formatArray[1] ?? format;

  const shouldRemoveTimePart = (
    timeOption: TimeUnitOptions | undefined,
  ): boolean => {
    if (timeOption && Array.isArray(timeOption) && timeOption.length === 0)
      return true;
    if (timeOption && !Array.isArray(timeOption) && timeOption.step === 0)
      return true;

    return false;
  };

  const timeMarkers = [
    {
      markers: ['HH', 'ЧЧ'],
      timeOption: timeOptions?.hours,
    },
    {
      markers: ['mm', 'ММ'],
      timeOption: timeOptions?.minutes,
    },
    {
      markers: ['ss', 'СС'],
      timeOption: timeOptions?.seconds,
    },
  ];

  timeMarkers.forEach(({ markers, timeOption }) => {
    if (shouldRemoveTimePart(timeOption)) {
      markers.forEach((marker) => {
        adaptedFormat = adaptedFormat.replace(
          new RegExp(`:?${marker}`, 'g'),
          '',
        );
      });
    }
  });

  adaptedFormat = adaptedFormat
    .replace(/:+$/, '')
    .replace(/^:+/, '')
    .replace(/:+/g, ':')
    .replace(/\s+/g, ' ')
    .trim();

  if (formatArray.length > 1) {
    formatArray[1] = adaptedFormat;
    return formatArray.filter((part) => part.length > 0).join(' ');
  }
  return adaptedFormat;
};

export const getTimeMaskBlocks = (timeOptions?: TimeOptions) => {
  const getBlockConfig = (
    timeType: 'hours' | 'minutes' | 'seconds',
    addUnits: typeof addHours | typeof addMinutes | typeof addSeconds,
    getItemLabel: (date: Date) => string,
    option?: TimeUnitOptions,
  ) => {
    const maxValue = timeType === 'hours' ? 23 : 59;
    const defaultConfig = { mask: IMask.MaskedRange, from: 0, to: maxValue };

    const numbers = getTimeNumbers(timeType, option);
    const isFullRange = numbers.length === maxValue + 1;

    if (isFullRange || numbers.length === 0) {
      return defaultConfig;
    }

    const startDate = startOfToday();
    const enumValues = numbers.map((n) => getItemLabel(addUnits(startDate, n)));
    return {
      mask: IMask.MaskedEnum,
      enum: enumValues,
    };
  };

  return {
    HH: getBlockConfig('hours', addHours, getLabelHours, timeOptions?.hours),
    mm: getBlockConfig(
      'minutes',
      addMinutes,
      getLabelMinutes,
      timeOptions?.minutes,
    ),
    ss: getBlockConfig(
      'seconds',
      addSeconds,
      getLabelSeconds,
      timeOptions?.seconds,
    ),
  };
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

  const setStringValue = useCallback((value: string) => {
    refs.current[0](value);
    if (imaskProps.ref?.current) {
      imaskProps.ref.current.value = value;
    }
    if (imaskProps.maskRef.current) {
      imaskProps.maskRef.current.updateValue();
    }
  }, []);

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setStringValue('');

      if (refs.current[1]) {
        onChangeRef.current?.(null, { e: e as unknown as Event });
      }
    },
    [],
  );

  useEffect(() => {
    if (value && isValid(value)) {
      setStringValue(format(value, formatProp));
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
        setStringValue('');
      }
    }
  }, [value?.getTime()]);

  return handleClear;
};

export const isValidTimeByTymeOptions = (
  date: Date,
  timeOptions?: TimeOptions,
): boolean => {
  const isUnitValid = (
    unit: 'hours' | 'minutes' | 'seconds',
    value: number,
    options?: TimeUnitOptions,
  ): boolean => {
    if (!options) return true;

    const allowed = getTimeNumbers(unit, options);
    if (allowed.length === 0) return true;

    return allowed.includes(value);
  };

  if (!timeOptions) return true;
  const isHoursValid = isUnitValid('hours', date.getHours(), timeOptions.hours);
  const isMinutesValid = isUnitValid(
    'minutes',
    date.getMinutes(),
    timeOptions.minutes,
  );
  const isSecondsValid = isUnitValid(
    'seconds',
    date.getSeconds(),
    timeOptions.seconds,
  );

  return isHoursValid && isMinutesValid && isSecondsValid;
};
