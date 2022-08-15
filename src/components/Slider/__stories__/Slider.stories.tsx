import { array, boolean, number, select, text } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';

import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { createMetadata } from '../../../utils/storybook';
import { defaultPropSize, propSize, propStatus } from '../helper';
import { Slider } from '../Slider';
import mdx from './Slider.docs.mdx';

const defaultKnobs = () => ({
  disabled: boolean('disabled', false),
  label: text('label', 'Лейбл'),
  caption: text('caption', 'Подпись'),
  status: select('status', ['', ...propStatus], ''),
  size: select('size', propSize, defaultPropSize),
  min: number('min', -20),
  max: number('max', 80),
  step: number('step', 1),
  range: boolean('range', false),
  withTooltip: boolean('withTooltip', false),
  customStep: array('customStep', ['0', '15', '50'], ','),
  steparray: boolean('steparray', false),
  withFormatter: boolean('withFormatter', false),
  view: select('view', ['default', 'division'], 'default'),
  leftSide: select('leftSide', ['', 'input', 'icon'], ''),
  rightSide: select('rightSide', ['', 'icon'], ''),
});

const leftSideMap = {
  icon: IconSettings,
  input: 'input',
} as const;

export const Playground = () => {
  const {
    view,
    disabled,
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
    withFormatter,
  } = defaultKnobs();
  const [value, setValue] = useState<number | [number, number]>(
    range ? [10, 40] : 50,
  );
  const [stepValue, setStepValue] = useState<number | number[]>(step);

  useEffect(() => {
    if (steparray) {
      const stepArr = customStep.map((val) => Number(val));
      setStepValue(stepArr);
    } else {
      setStepValue(step);
    }
  }, [customStep, steparray, step]);

  useEffect(() => {
    if (range) setValue([10, 40]);
    else setValue(50);
  }, [range]);

  return (
    <Slider
      value={value}
      range={range}
      min={min}
      size={size}
      disabled={disabled}
      max={max}
      label={label}
      caption={caption}
      status={status || undefined}
      withTooltip={withTooltip}
      step={stepValue}
      view={view}
      tooltipFormatter={withFormatter ? (value) => `${value}%` : undefined}
      leftSide={leftSide ? leftSideMap[leftSide] : undefined}
      rightSide={rightSide === 'icon' ? IconSettings : undefined}
      onChange={({ value }) => setValue(value)}
    />
  );
};

export default createMetadata({
  title: 'Компоненты|/Базовые/Slider(Canary)',
  id: 'components/Slider',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=67568%3A129967',
    },
  },
});
