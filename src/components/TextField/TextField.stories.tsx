import React, { useState } from 'react';
import { boolean, text, withKnobs, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Icon from '../Icon/icons/Photo';
import { TextField } from './TextField';

const knobs = () => ({
  width: select('width', ['full', 'default'], 'default'),
  form: select(
    'form',
    [
      'default',
      'brick',
      'round',
      'clear-round',
      'round-clear',
      'clear-default',
      'default-clear',
      'default-brick',
      'brick-default',
      'brick-clear',
      'clear-brick',
      'clear-clear',
    ],
    'default'
  ),
  state: select('state', ['', 'alert', 'success', 'warning'], ''),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  disabled: boolean('disabled', false),
  type: select(
    'type',
    [
      'text',
      'textarea',
      'color',
      'email',
      'number',
      'search',
      'tel',
      'date',
      'time',
      'datetime',
      'datetime-local',
      'url',
      'month',
      'week',
    ],
    'text'
  ),
  maxLength: number('maxLength', 200),
  minRows: number('minRows', 1),
  maxRows: number('maxRows', 5),
  placeholder: text('placeholder', 'My placeholder'),
  leftSideType: select('leftSideType', ['icon', 'text', 'false'], 'false'),
  leftSideText: text('leftSideText', 'from'),
  rightSideType: select('rightSideType', ['icon', 'text', 'false'], 'false'),
  rightSideText: text('rightSideText', 'm²'),
});

function Stories({
  width,
  form,
  state,
  size,
  type,
  maxLength,
  minRows,
  maxRows,
  placeholder,
  leftSideType,
  leftSideText,
  rightSideType,
  rightSideText,
  disabled,
}: any) {
  const [value, setValue] = useState<string | null | undefined>(undefined);

  const leftSideSelect = {
    text: leftSideText,
    icon: Icon,
    false: null,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: Icon,
    false: null,
  };

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  return (
    <TextField
      value={value}
      width={width}
      form={form}
      state={state}
      size={size}
      type={type}
      maxLength={maxLength}
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
      onChange={({ value }) => setValue(value)}
      leftSide={leftSide}
      rightSide={rightSide}
      disabled={disabled}
    />
  );
}

storiesOf('TextField', module)
  .addDecorator(withKnobs)
  .add('Текстовое поле ввода', () => {
    return <Stories {...knobs()} />;
  });
