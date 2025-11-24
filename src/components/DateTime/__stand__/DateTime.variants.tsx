import { useBoolean, useDate, useNumber, useSelect } from '@consta/stand';
import { addDays, endOfDecade, startOfDecade, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';
import React, { useState } from 'react';

import { getByMap } from '../../../utils/getByMap';
import { DateTime, DateTimePropLocale } from '../DateTime';
import {
  dateTimePropType,
  dateTimePropTypeDefault,
  dateTimePropView,
  dateTimePropViewDefault,
  TimeOptions,
} from '../helpers';

const localeProp = ['ru', 'en-US', 'zh-CN', 'es'] as const;
type LocaleProp = typeof localeProp[number];
const localeDefault: LocaleProp = localeProp[0];

const localeMap: Record<LocaleProp, DateTimePropLocale> = {
  'ru': ruLocale,
  'en-US': {
    ...enUSLocale,
    words: { hours: 'hrs', minutes: 'min', seconds: 'sec' },
  },
  'zh-CN': {
    ...zhCNLocale,
    words: { hours: '小时', minutes: '分钟', seconds: '秒' },
  },
  'es': {
    ...esLocale,
    words: { hours: 'hrs', minutes: 'min', seconds: 'seg' },
  },
};

const Variants = () => {
  const type = useSelect('type', dateTimePropType, dateTimePropTypeDefault);
  const view = useSelect('view', dateTimePropView, dateTimePropViewDefault);
  const withEvents = useBoolean('withEvents', false);
  const minDate = useDate('minDate', startOfDecade(new Date()));
  const maxDate = useDate('maxDate', endOfDecade(new Date()));
  const locale =
    useSelect('locale', localeProp, localeDefault) || localeDefault;

  const currentDay = new Date();

  const [value, setValue] = useState<Date | undefined>(undefined);

  const events = withEvents
    ? [
        startOfWeek(currentDay, { locale: ruLocale }),
        currentDay,
        addDays(currentDay, 2),
      ]
    : undefined;

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

  return (
    <DateTime
      type={type}
      value={value}
      view={view}
      onChange={setValue}
      minDate={minDate}
      maxDate={maxDate}
      events={events}
      locale={getByMap(localeMap, locale)}
      timeOptions={timeOptions}
    />
  );
};

export default Variants;
