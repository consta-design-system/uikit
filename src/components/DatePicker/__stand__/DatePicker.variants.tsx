import { useBoolean, useDate, useSelect, useText } from '@consta/stand';
import { addDays, Locale, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';
import React, { useEffect, useState } from 'react';

import { IconCalendar } from '../../../icons/IconCalendar/IconCalendar';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { getByMap } from '../../../utils/getByMap';
import { Button } from '../../Button/Button';
import {
  dateTimePropView,
  dateTimePropViewDefault,
} from '../../DateTime/helpers';
import {
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
} from '../../TextField/TextField';
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

const Variants = () => {
  const type = useSelect('type', datePickerPropType, datePickerPropTypeDefault);
  const form = useSelect('form', textFieldPropForm, textFieldPropFormDefault);
  const status = useSelect('status', ['', ...textFieldPropStatus], '');
  const withClearButton = useBoolean('withClearButton', false);
  const withAdditionalControls = useBoolean('with additional controls', false);
  const label = useText('label', 'Заголовок');
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
  const locale = useSelect('locale', localeProp, localeDefault);
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
      />
    </div>
  );
};

export default Variants;
