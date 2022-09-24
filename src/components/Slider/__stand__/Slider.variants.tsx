import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useEffect, useState } from 'react';

import { IconSettings } from '../../../icons/IconSettings/IconSettings';
import { defaultPropSize, propSize, propStatus } from '../helper';
import { Slider } from '../Slider';

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const label = useText('label', 'Лейбл');
  const caption = useText('caption', 'Подпись');
  const status = useSelect('status', ['undefined', ...propStatus], 'undefined');
  const size = useSelect('size', propSize, defaultPropSize);
  const min = useNumber('min', -20);
  const max = useNumber('max', 80);
  const step = useNumber('step', 1);
  const range = useBoolean('range', false);
  const withTooltip = useBoolean('withTooltip', false);
  const withFormatter = useBoolean(
    'withFormatter',
    false,
    Boolean(withTooltip),
  );
  const steparray = useBoolean('steparray', false);

  const view = useSelect('view', ['default', 'division'], 'default');
  const leftSide = useSelect(
    'leftSide',
    ['undefined', 'input', 'icon'],
    'undefined',
  );
  const rightSide = useSelect('rightSide', ['undefined', 'icon'], 'undefined');

  const leftSideMap = {
    icon: IconSettings,
    input: 'input',
  } as const;

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
      status={status !== 'undefined' ? status : undefined}
      withTooltip={withTooltip}
      step={stepValue}
      view={view}
      tooltipFormatter={withFormatter ? (value) => `${value}%` : undefined}
      leftSide={leftSide !== 'undefined' ? leftSideMap[leftSide] : undefined}
      rightSide={rightSide === 'icon' ? IconSettings : undefined}
      onChange={({ value }) => setValue(value)}
    />
  );
};

export default Variants;
