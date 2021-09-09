import React, { useState } from 'react';
import { boolean, date, select } from '@storybook/addon-knobs';
import { addDays, endOfYear, Locale, set, startOfWeek, startOfYear } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  DateTime,
  DateTime10Years,
  DateTime10YearSlider,
  DateTime100YearSlider,
  DateTimeTime,
  DateTimeTypeYearViewBook,
  DateTimeTypeYearViewClassic,
  DateTimeTypeYearViewSlider,
  DateTimeYear,
  DateTimeYearSlider,
} from '../DateTime';
import {
  dateTimePropType,
  dateTimePropTypeDefault,
  dateTimePropView,
  dateTimePropViewDefault,
} from '../helpers';

import mdx from './DateTime.docs.mdx';

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
  type: select('type', dateTimePropType, dateTimePropTypeDefault),
  view: select('view', dateTimePropView, dateTimePropViewDefault),
  withEvents: boolean('withEvents', false),
  minDate: date('minDate', startOfYear(new Date())),
  maxDate: date('maxDate', endOfYear(new Date())),
  locale: select('locale', localeProp, localeDefault),
});

export function Playground() {
  const { type, view, withEvents, minDate, maxDate, locale } = defaultKnobs();
  const currentDay = new Date();

  const [value, setValue] = useState<Date | undefined>(undefined);

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  return (
    <DateTime
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

export const DateTime10YearsStory = createStory(
  () => (
    <DateTime10Years
      years={[
        { label: '2000' },
        { label: '2001' },
        { label: '2002', current: true },
        { label: '2003', selected: true },
        { label: '2004' },
        { label: '2005', range: 'first', selected: true },
        { label: '2006', range: true },
        { label: '2007', range: true },
        { label: '2008', range: true },
        { label: '2010', range: 'last', selected: true },
        { label: '2011' },
        { label: '2012' },
      ]}
    />
  ),
  {
    name: 'DateTime10Years',
  },
);

export const DateTimeYearStory = createStory(
  () => (
    <DateTimeYear
      years={[
        { label: 'Янв' },
        { label: 'Фев' },
        { label: 'Мар', current: true },
        { label: 'Апр', selected: true },
        { label: 'Май' },
        { label: 'Июн', range: 'first', selected: true },
        { label: 'Июл', range: true },
        { label: 'Авг', range: true },
        { label: 'Сен', range: true },
        { label: 'Окт', range: 'last', selected: true },
        { label: 'Ноя' },
        { label: 'Дек' },
      ]}
    />
  ),
  {
    name: 'DateTimeYear',
  },
);

const minDate = set(new Date(), { hours: 2, minutes: 59, seconds: 59 });
const maxDate = set(new Date(), { hours: 18, minutes: 30, seconds: 20 });

export const DateTimeTimeStory = createStory(
  () => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <DateTimeTime
        value={value}
        onChange={({ value }) => setValue(value)}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
  {
    name: 'DateTimeTime',
  },
);

export const DateTimeYearSliderStory = createStory(
  () => {
    const [value, setValue] = useState<Date>(new Date());

    return (
      <DateTimeYearSlider
        currentVisibleDate={value}
        onChange={(date) => setValue(date)}
        value={[new Date(), addDays(new Date(), 200)]}
      />
    );
  },
  {
    name: 'DateTimeYearSlider',
  },
);

export const DateTime10YearSliderStory = createStory(
  () => {
    const [value, setValue] = useState<Date>(new Date('2010'));

    return (
      <DateTime10YearSlider
        currentVisibleDate={value}
        onChange={(date) => setValue(date)}
        value={[new Date(2014, 7, 1), new Date(2031, 6)]}
      />
    );
  },
  {
    name: 'DateTime10YearSlider',
  },
);

export const DateTime100YearSliderStory = createStory(
  () => {
    const [value, setValue] = useState<Date>(new Date('0110'));

    return (
      <DateTime100YearSlider
        currentVisibleDate={value}
        onChange={(date) => setValue(date)}
        value={[new Date(-80, 5), new Date(2071, 5)]}
      />
    );
  },
  {
    name: 'DateTime100YearSlider',
  },
);

export const DateTimeTypeYearViewClassicStory = createStory(
  () => {
    const [value, setValue] = useState<[Date?, Date?] | undefined>(undefined);

    return (
      <DateTimeTypeYearViewClassic
        value={value}
        onChangeRange={({ value }) => setValue(value)}
        minDate={new Date(2021, 0)}
        maxDate={new Date(2027, 0)}
      />
    );
  },
  {
    name: 'DateTimeTypeYearViewClassic',
  },
);

export const DateTimeTypeYearViewBookStory = createStory(
  () => {
    const [value, setValue] = useState<[Date?, Date?] | undefined>(undefined);

    return (
      <DateTimeTypeYearViewBook
        value={value}
        onChangeRange={({ value }) => setValue(value)}
        minDate={new Date(2021, 0)}
        maxDate={new Date(2044, 0)}
      />
    );
  },
  {
    name: 'DateTimeTypeYearViewBook',
  },
);

export const DateTimeTypeYearViewSliderStory = createStory(
  () => {
    const [value, setValue] = useState<[Date?, Date?] | undefined>(undefined);

    return (
      <DateTimeTypeYearViewSlider
        value={value}
        onChangeRange={({ value }) => setValue(value)}
        minDate={new Date(2003, 0)}
        maxDate={new Date(2305, 0)}
      />
    );
  },
  {
    name: 'DateTimeTypeYearViewSlider',
  },
);

export default createMetadata({
  title: 'Компоненты/Базовые/DateTime',
  id: 'components/DateTime',
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
