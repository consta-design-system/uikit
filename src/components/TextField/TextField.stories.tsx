import React, { useState, useRef } from 'react';
import { boolean, text, withKnobs, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconPhoto } from '../../icons/IconPhoto/IconPhoto';
import { TextField } from './TextField';

const knobs = () => ({
  width: select('width', ['full', 'default'], 'default'),
  form: select(
    'form',
    [
      'default',
      'brick',
      'round',
      'clearRound',
      'roundClear',
      'clearDefault',
      'defaultClear',
      'defaultBrick',
      'brickDefault',
      'brickClear',
      'clearBrick',
      'clearClear',
    ],
    'default'
  ),
  state: select('state', ['', 'alert', 'success', 'warning'], ''),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['default', 'clear'], 'default'),
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
  view,
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
}) {
  const [value, setValue] = useState<string | null | undefined>(undefined);
  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
    false: null,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
    false: null,
  };

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  const handleChange = ({ value }) => {
    setValue(value);
  };

  return (
    <TextField
      value={value}
      width={width}
      form={form}
      state={state}
      size={size}
      view={view}
      type={type}
      maxLength={maxLength}
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
      onChange={handleChange}
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
