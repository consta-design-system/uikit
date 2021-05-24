import React, { useState } from 'react';
import { boolean, date, select } from '@storybook/addon-knobs';
import { addDays, endOfYear, Locale, startOfWeek, startOfYear } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata } from '../../../utils/storybook';
import { Calendar } from '../Calendar';
import {
  calendarPropType,
  calendarPropTypeDefault,
  CalendarPropValue,
  calendarPropView,
  calendarPropViewDefault,
} from '../helpers';

import mdx from './Calendar.docs.mdx';

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
  type: select('type', calendarPropType, calendarPropTypeDefault),
  view: select('view', calendarPropView, calendarPropViewDefault),
  withEvents: boolean('withEvents', false),
  minDate: date('minDate', startOfYear(new Date())),
  maxDate: date('maxDate', endOfYear(new Date())),
  locale: select('locale', localeProp, localeDefault),
});

export function Playground() {
  const { type, view, withEvents, minDate, maxDate, locale } = defaultKnobs();
  const currentDay = new Date();

  const [value, setValue] = useState<CalendarPropValue<typeof type> | undefined>(undefined);

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  return (
    <Calendar
      type={type}
      value={value}
      view={view}
      onChange={({ value }) => setValue(value)}
      minDate={new Date(minDate)}
      maxDate={new Date(maxDate)}
      events={events}
      locale={getSizeByMap(localeMap, locale)}
    />
  );
}

export default createMetadata({
  title: 'Компоненты/Базовые/Calendar',
  id: 'components/Calendar',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A33602',
    },
  },
});
