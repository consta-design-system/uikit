import React, { useEffect, useState } from 'react';
import { boolean, date, select, text } from '@storybook/addon-knobs';
import { addDays, Locale, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { IconCalendar } from '../../../icons/IconCalendar/IconCalendar';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { getByMap } from '../../../utils/getByMap';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
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
  datePickerPropDropdownForm,
  datePickerPropDropdownFormDefault,
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
  withAdditionalControls: boolean('withAdditionalControls', false),
  label: text('label', 'Заголовок'),
  caption: text('caption', 'Подпись'),
  required: boolean('required', false),
  labelPosition: select('labelPosition', ['top', 'left'], 'top'),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  view: select('view', textFieldPropView, textFieldPropViewDefault),
  disabled: boolean('disabled', false),
  withIcon: boolean('withIcon', false),
  minDate: date('minDate', minDateDefault),
  maxDate: date('maxDate', maxDateDefault),
  withEvents: boolean('withEvents', false),
  locale: select('locale', localeProp, localeDefault),
  dateTimeView: select('dateTimeView', dateTimePropView, dateTimePropViewDefault),
  dropdownForm: select(
    'dropdownForm',
    datePickerPropDropdownForm,
    datePickerPropDropdownFormDefault,
  ),
});

const additionalControls = () => {
  return [<Button label="Кнопка" />, <Button label="Кнопка" />];
};

export function Playground() {
  const {
    form,
    status,
    label,
    caption,
    required,
    labelPosition,
    size,
    view,
    withIcon,
    disabled,
    withEvents,
    locale,
    dateTimeView,
    dropdownForm,
    type,
    minDate,
    maxDate,
    withAdditionalControls,
  } = defaultKnobs();

  const [value, setValue] = useState<DatePickerPropValue<typeof type>>(null);

  const currentDay = new Date();

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  const icon = withIcon ? IconCalendar : undefined;

  useEffect(() => {
    setValue(null);
  }, [type]);

  return (
    <div style={{ maxWidth: 500 }}>
      <DatePicker
        type={type}
        width="full"
        form={form}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
        required={required}
        value={value}
        status={status || undefined}
        view={view}
        disabled={disabled}
        size={size}
        onChange={({ value }) => setValue(value)}
        rightSide={icon}
        events={events}
        locale={getByMap(localeMap, locale)}
        dateTimeView={dateTimeView}
        dropdownForm={dropdownForm}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        {...(type === 'date-range' && {
          endFieldRightSide: icon,
          startFieldRightSide: icon,
        })}
        renderAdditionalControls={withAdditionalControls ? additionalControls : undefined}
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
