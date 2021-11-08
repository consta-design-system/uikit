import React, { useCallback, useEffect, useState } from 'react';
import { array, boolean, number, select, text } from '@storybook/addon-knobs';

import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { createMetadata } from '../../../utils/storybook';
import { TextField, TextFieldOnChangeArguments } from '../../TextField/TextField';
import { defaultPropSize, propSize, propStatus } from '../helper';
import { Slider } from '../Slider';

const defaultKnobs = () => ({
  knobValue: number('value', 50),
  label: text('label', 'Лейбл'),
  caption: text('caption', 'Кэпшн'),
  status: select('status', ['', ...propStatus], ''),
  size: select('size', propSize, defaultPropSize),
  min: number('min', -20),
  max: number('max', 80),
  step: number('step', 1),
  range: boolean('range', false),
  withTooltip: boolean('withTooltip', false),
  steparray: array('customStep', ['0', '15', '50'], ','),
  customStep: boolean('steparray', false),
  view: select('view', ['default', 'division'], 'default'),
  leftSide: select('leftSide', ['', 'icon', 'input'], ''),
  rightSide: select('rightSide', ['', 'icon', 'input'], ''),
});

export function Playground() {
  const {
    view,
    knobValue,
    label,
    status,
    size,
    caption,
    min,
    max,
    step = 1,
    withTooltip,
    leftSide,
    rightSide,
    customStep,
    steparray,
    range,
  } = defaultKnobs();
  const [value, setValue] = useState<number | number[]>(range ? [10, 40] : knobValue);
  const [stepValue, setStepValue] = useState<number | number[]>(step);

  useEffect(() => {
    if (customStep) {
      const stepArr = steparray.map((val) => Number(val));
      setStepValue(stepArr);
    }
  }, [customStep, steparray]);

  useEffect(() => {
    if (range) setValue([10, 40]);
    else setValue(knobValue);
  }, [range]);

  const onChange = useCallback(
    (e: TextFieldOnChangeArguments) => {
      const newVal = Number(e.value);
      setValue(Array.isArray(value) ? [newVal, value[1]] : newVal);
    },
    [value],
  );

  const left =
    leftSide === 'input' ? (
      <TextField
        size={size}
        min={min}
        max={max}
        type="number"
        status={status !== '' ? status : undefined}
        onChange={onChange}
        step={step}
        value={(Array.isArray(value) ? value[0] : value).toString()}
      />
    ) : (
      <IconSettings view="secondary" size={size === 'l' ? 'm' : size} />
    );

  const right =
    rightSide === 'input' ? (
      <TextField
        size={size}
        min={min}
        status={status !== '' ? status : undefined}
        max={max}
        type="number"
        onChange={onChange}
        step={step}
        value={(Array.isArray(value) ? value[0] : value).toString()}
      />
    ) : (
      <IconSettings view="secondary" size={size === 'l' ? 'm' : size} />
    );

  return (
    <Slider
      value={value}
      range={range}
      min={min}
      size={size}
      max={max}
      label={label}
      caption={caption}
      status={status || undefined}
      withTooltip={withTooltip}
      step={stepValue}
      view={view}
      leftSide={leftSide !== '' && left}
      rightSide={rightSide !== '' && right}
      onChange={({ value }) => setValue(value)}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/Slider',
  id: 'components/Slider',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5164%3A84922',
    },
  },
});
