import { array, boolean, number, select, text } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { IconPhoto } from '../../../icons/IconPhoto/IconPhoto';
import { createMetadata } from '../../../utils/storybook';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import {
  TextField,
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropViewDefault,
  textFieldPropWidth,
  textFieldPropWidthDefault,
} from '../TextField';
import mdx from './TextField.docs.mdx';

const defaultKnobs = () => ({
  width: select('width', textFieldPropWidth, textFieldPropWidthDefault),
  form: select('form', textFieldPropForm, textFieldPropFormDefault),
  status: select('status', ['', ...textFieldPropStatus], ''),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  view: select('view', textFieldPropView, textFieldPropViewDefault),
  disabled: boolean('disabled', false),
  required: boolean('required', false),
  type: select('type', ['text', 'number', 'textarea', 'password'], 'text'),
  step: number('step', 1),
  withStepArray: boolean('withStepArray', false),
  stepArray: array('stepArray', ['10', '50', '100']),
  min: number('min', 0),
  max: number('max', 150),
  incrementButtons: boolean('incrementButtons', true),
  withClearButton: boolean('withClearButton', false),
  caption: text('caption', 'Подпись'),
  label: text('label', 'Заголовок'),
  labelPosition: select('labelPosition', ['top', 'left'], 'top'),
  maxLength: number('maxLength', 200),
  minRows: number('minRows', 1),
  maxRows: number('maxRows', 5),
  placeholder: text('placeholder', 'Подсказка в поле'),
  leftSideType: select('leftSideType', ['icon', 'text', 'false'], 'false'),
  leftSideText: text('leftSideText', 'from'),
  rightSideType: select('rightSideType', ['icon', 'text', 'false'], 'false'),
  rightSideText: text('rightSideText', 'm²'),
});

export const Playground = () => {
  const {
    width,
    form,
    status,
    size,
    view,
    type,
    label,
    required,
    caption,
    labelPosition,
    step,
    maxLength,
    minRows,
    maxRows,
    stepArray,
    withStepArray,
    min,
    max,
    placeholder,
    leftSideType,
    leftSideText,
    rightSideType,
    withClearButton,
    incrementButtons,
    rightSideText,
    disabled,
  } = defaultKnobs();
  const [value, setValue] = useState<string | null | undefined>(undefined);
  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
    false: undefined,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
    false: undefined,
  };

  const numberStepArray = stepArray.map((val) => Number(val));

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  const handleChange = ({ value }: { value: string | null }) => {
    setValue(value);
  };

  return (
    <EventInterceptorProvider
      eventHandler={action('EventInterceptor')}
      map={eventInterceptorMap}
    >
      <div>
        <TextField
          value={value}
          width={width}
          form={form}
          status={status || undefined}
          size={size}
          view={view}
          type={type}
          required={required}
          step={withStepArray ? numberStepArray : step}
          min={min}
          max={max}
          withClearButton={withClearButton}
          incrementButtons={incrementButtons}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
          placeholder={placeholder}
          onChange={handleChange}
          leftSide={leftSide}
          rightSide={rightSide}
          disabled={disabled}
          label={label}
          caption={caption}
          labelPosition={labelPosition}
        />
      </div>
    </EventInterceptorProvider>
  );
};

export default createMetadata({
  title: 'Компоненты|/Базовые/TextField',
  id: 'components/TextField',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5164%3A84922',
    },
  },
});
