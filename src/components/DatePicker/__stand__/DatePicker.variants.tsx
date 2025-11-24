import './DatePicker.variants.css';

import { IconCalendar } from '@consta/icons/IconCalendar';
import { IconQuestion } from '@consta/icons/IconQuestion';
import {
  useBoolean,
  useDate,
  useNumber,
  useSelect,
  useText,
} from '@consta/stand';
import { addDays, Locale, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';
import React, { useEffect, useState } from 'react';

import { Button } from '##/components/Button/Button';
import {
  dateTimePropView,
  dateTimePropViewDefault,
  TimeOptions,
} from '##/components/DateTime/helpers';
import {
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
} from '##/components/TextField/TextField';
import { cn } from '##/utils/bem';
import { maxDateDefault, minDateDefault } from '##/utils/date';
import { getByMap } from '##/utils/getByMap';

import {
  DatePicker,
  datePickerPropDropdownForm,
  datePickerPropDropdownFormDefault,
  datePickerPropType,
  datePickerPropTypeDefault,
  DatePickerPropValue,
} from '../DatePicker';

const localeProp = ['ru', 'en-US', 'zh-CN', 'es'] as const;
type LocaleProp = typeof localeProp[number];
const localeDefault: LocaleProp = localeProp[0];

const localeMap: Record<LocaleProp, Locale> = {
  'ru': ruLocale,
  'en-US': enUSLocale,
  'zh-CN': zhCNLocale,
  'es': esLocale,
};

const cnDatePickerVariants = cn('DatePickerVariants');

const Variants = () => {
  const type =
    useSelect('type', datePickerPropType, datePickerPropTypeDefault) ||
    datePickerPropTypeDefault;
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const status = useSelect('status', textFieldPropStatus);
  const withClearButton = useBoolean('withClearButton', false);
  const withAdditionalControls = useBoolean('with additional controls', false);
  const label = useText('label', 'Заголовок');
  const withLabelIcon = useBoolean('withLabelIcon', false);
  const labelPosition = useSelect(
    'labelPosition',
    ['top', 'left'],
    'top',
    Boolean(label),
  );
  const required = useBoolean('required', false, Boolean(label));
  const caption = useText('caption', 'Подпись');
  const size = useSelect('size', textFieldPropSize, textFieldPropSizeDefault);
  const view = useSelect('view', textFieldPropView, textFieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const withIcon = useBoolean('withIcon', false);
  const minDate = useDate('minDate', minDateDefault);
  const maxDate = useDate('maxDate', maxDateDefault);
  const withEvents = useBoolean('withEvents', false);
  const withDisableDates = useBoolean('withDisableDates', false);
  const locale =
    useSelect('locale', localeProp, localeDefault) || localeDefault;
  const dateTimeView = useSelect(
    'dateTimeView',
    dateTimePropView,
    dateTimePropViewDefault,
  );
  const dropdownForm = useSelect(
    'dropdownForm',
    datePickerPropDropdownForm,
    datePickerPropDropdownFormDefault,
  );

  const hoursStep = useNumber('hoursStep', 1);
  const hoursStart = useNumber('hoursStart', 0);
  const hoursStop = useNumber('hoursStop', 23);

  const minutesStep = useNumber('minutesStep', 1);
  const minutesStart = useNumber('minutesStart', 0);
  const minutesStop = useNumber('minutesStop', 59);

  const secondsStep = useNumber('secondsStep', 1);
  const secondsStart = useNumber('secondsStart', 0);
  const secondsStop = useNumber('secondsStop', 59);

  const timeOptions: TimeOptions | undefined = {
    hours: {
      start: hoursStart,
      stop: hoursStop,
      step: hoursStep,
    },
    minutes: {
      start: minutesStart,
      stop: minutesStop,
      step: minutesStep,
    },
    seconds: {
      start: secondsStart,
      stop: secondsStop,
      step: secondsStep,
    },
  };

  const additionalControls = () => {
    return [
      <Button label="Кнопка" key="1" />,
      <Button label="Кнопка" key="2" />,
    ];
  };

  const [value, setValue] = useState<DatePickerPropValue<typeof type>>(null);

  const currentDay = new Date();

  const events = withEvents
    ? [
        startOfWeek(currentDay, { locale: ruLocale }),
        currentDay,
        addDays(currentDay, 2),
      ]
    : undefined;

  const icon = withIcon ? IconCalendar : undefined;

  const getDisableDates = (): Array<Date | [Date, Date]> => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return [
      // интервал времени текущей даты с 12:34:20 - 16:10:41
      [
        new Date(year, month, day, 12, 34, 20),
        new Date(year, month, day, 16, 10, 41),
      ],
      // следующий день
      new Date(year, month, day + 1),
      // отключаем с 2го по 12ое включительно
      [new Date(year, month, 2), new Date(year, month, 13)],
    ];
  };

  const disableDates = withDisableDates ? getDisableDates() : undefined;

  useEffect(() => {
    setValue(null);
  }, [type]);

  return (
    <div className={cnDatePickerVariants()}>
      <DatePicker
        type={type}
        form={form}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
        required={required}
        labelIcon={withLabelIcon ? IconQuestion : undefined}
        value={value}
        status={status}
        view={view}
        disabled={disabled}
        disableDates={disableDates}
        size={size}
        onChange={setValue}
        leftSide={icon}
        events={events}
        locale={getByMap(localeMap, locale)}
        dateTimeView={dateTimeView}
        dropdownForm={dropdownForm}
        minDate={minDate}
        maxDate={maxDate}
        renderAdditionalControls={
          withAdditionalControls ? additionalControls : undefined
        }
        withClearButton={withClearButton}
        timeOptions={timeOptions}
      />
    </div>
  );
};

export default Variants;
