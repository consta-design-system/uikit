import React, { useEffect, useState } from 'react';
import { boolean, date, select, text } from '@storybook/addon-knobs';
import { addDays, Locale, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { IconCalendar } from '../../../icons/IconCalendar/IconCalendar';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata } from '../../../utils/storybook';
import { dateTimePropView, dateTimePropViewDefault } from '../../DateTimeCanary/helpers';
import {
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
} from '../../TextField/TextField';
import { DatePicker } from '../DatePickerCanary';
import {
  datePickerPropCalendarForm,
  datePickerPropCalendarFormDefault,
  datePickerPropFormatDefault,
  datePickerPropPlaceholderDefault,
  datePickerPropSeparatorDefault,
  datePickerPropType,
  datePickerPropTypeDefault,
  DatePickerPropValue,
} from '../helpers';

import mdx from './DatePicker.docs.mdx';

const localeProp = ['ru', 'en-US', 'zh-CN', 'es'] as const;
type LocaleProp = typeof localeProp[number];
const localeDefault: LocaleProp = localeProp[0];

const localeMap: Record<LocaleProp, Locale> = {
  'ru': ruLocale,
  'en-US': enUSLocale,
  'zh-CN': zhCNLocale,
  'es': esLocale,
};

const defaultKnobs = () => ({
  type: select('type', datePickerPropType, datePickerPropTypeDefault),
  form: select('form', textFieldPropForm, textFieldPropFormDefault),
  status: select('status', ['', ...textFieldPropStatus], ''),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  view: select('view', textFieldPropView, textFieldPropViewDefault),
  disabled: boolean('disabled', false),
  placeholder: text('placeholder', datePickerPropPlaceholderDefault),
  leftSideType: select('leftSideType', ['icon', 'text', 'false'], 'false'),
  leftSideText: text('leftSideText', 'from'),
  rightSideType: select('rightSideType', ['icon', 'text', 'false'], 'false'),
  rightSideText: text('rightSideText', 'text'),
  minDate: date('minDate', minDateDefault),
  maxDate: date('maxDate', maxDateDefault),
  format: text('format', datePickerPropFormatDefault),
  separator: text('separator', datePickerPropSeparatorDefault),
  withEvents: boolean('withEvents', false),
  locale: select('locale', localeProp, localeDefault),
  calendarView: select('calendarView', dateTimePropView, dateTimePropViewDefault),
  calendarForm: select(
    'calendarForm',
    datePickerPropCalendarForm,
    datePickerPropCalendarFormDefault,
  ),
});

export function Playground() {
  const {
    form,
    status,
    size,
    view,
    placeholder,
    leftSideType,
    leftSideText,
    rightSideType,
    rightSideText,
    disabled,
    withEvents,
    locale,
    calendarView,
    format,
    separator,
    calendarForm,
    type,
  } = defaultKnobs();

  const [value, setValue] = useState<DatePickerPropValue<typeof type>>(null);

  const currentDay = new Date();

  const leftSideSelect = {
    text: leftSideText,
    icon: IconCalendar,
    false: undefined,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconCalendar,
    false: undefined,
  };

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  useEffect(() => {
    setValue(null);
  }, [type]);

  return (
    <div style={{ maxWidth: 500 }}>
      <DatePicker
        type={type}
        width="full"
        form={form}
        value={value}
        status={status || undefined}
        view={view}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        onChange={({ value }) => setValue(value)}
        leftSide={leftSide}
        rightSide={rightSide}
        events={events}
        locale={getSizeByMap(localeMap, locale)}
        calendarView={calendarView}
        format={format}
        separator={separator}
        calendarForm={calendarForm}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/DatePicker(Canary)',
  id: 'components/DatePicker',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=11302%3A58',
    },
  },
});
