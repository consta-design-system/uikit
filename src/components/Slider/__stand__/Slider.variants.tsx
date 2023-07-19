import { IconQuestion } from '@consta/icons/IconQuestion';
import { IconSettings } from '@consta/icons/IconSettings';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useEffect, useState } from 'react';

import { defaultPropSize, propSize, propStatus } from '../helper';
import { Slider } from '../Slider';

const sideMap = {
  icon: IconSettings,
  input: 'input',
} as const;

const Variants = () => {
  const range = useBoolean('range');
  const disabled = useBoolean('disabled');
  const label = useText('label', 'Лейбл');
  const withLabelIcon = useBoolean('withLabelIcon');
  const caption = useText('caption', 'Подпись');
  const status = useSelect('status', propStatus);
  const size = useSelect('size', propSize, defaultPropSize);
  const min = useNumber('min', -20);
  const max = useNumber('max', 80);
  const step = useNumber('step', 1);
  const withTooltip = useBoolean('withTooltip');
  const withFormatter = useBoolean(
    'withFormatter',
    false,
    Boolean(withTooltip),
  );
  const steparray = useBoolean('steparray');

  const view = useSelect('view', ['default', 'division'], 'default');
  const leftSide = useSelect('leftSide', ['input', 'icon']);
  const rightSide = useSelect('rightSide', ['input', 'icon']);

  const [value, setValue] = useState<number | [number, number]>(
    range ? [10, 40] : 50,
  );
  const [stepValue, setStepValue] = useState<number | number[]>(Number(step));

  useEffect(() => {
    if (steparray) {
      setStepValue([0, 15, 50]);
    } else {
      setStepValue(Number(step));
    }
  }, [steparray, step]);

  useEffect(() => {
    if (range) {
      setValue([10, 40]);
    } else {
      setValue(50);
    }
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
      status={status}
      labelIcon={withLabelIcon ? IconQuestion : undefined}
      withTooltip={withTooltip}
      step={stepValue}
      view={view}
      tooltipFormatter={withFormatter ? (value) => `${value}%` : undefined}
      leftSide={leftSide && sideMap[leftSide]}
      rightSide={rightSide && sideMap[rightSide]}
      onChange={({ value }) => setValue(value)}
    />
  );
};

export default Variants;
