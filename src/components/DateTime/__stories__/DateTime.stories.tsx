import React, { useState } from 'react';
import { boolean, date, number, select } from '@storybook/addon-knobs';
import { addDays, endOfDecade, startOfDecade, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata } from '../../../utils/storybook';
import { DateTime, DateTimePropLocale } from '../DateTime';
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

const localeMap: Record<LocaleProp, DateTimePropLocale> = {
  'ru': ruLocale,
  'en-US': { ...enUSLocale, words: { hours: 'hrs', minutes: 'min', seconds: 'sec' } },
  'zh-CN': { ...zhCNLocale, words: { hours: '小时', minutes: '分钟', seconds: '秒' } },
  'es': { ...esLocale, words: { hours: 'hrs', minutes: 'min', seconds: 'seg' } },
};

const defaultKnobs = () => ({
  type: select('type', dateTimePropType, dateTimePropTypeDefault),
  view: select('view', dateTimePropView, dateTimePropViewDefault),
  withEvents: boolean('withEvents', false),
  minDate: date('minDate', startOfDecade(new Date())),
  maxDate: date('maxDate', endOfDecade(new Date())),
  locale: select('locale', localeProp, localeDefault),
});

export function Playground() {
  const { type, view, withEvents, minDate, maxDate, locale } = defaultKnobs();
  const currentDay = new Date();

  const [value, setValue] = useState<Date | undefined>(undefined);

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  const timeProps =
    type === 'time' || type === 'date-time'
      ? {
          multiplicityHours: number('multiplicityHours', 1),
          multiplicityMinutes: number('multiplicityMinutes', 1),
          multiplicitySeconds: number('multiplicitySeconds', 1),
        }
      : {};

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
      {...timeProps}
    />
  );
}

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
