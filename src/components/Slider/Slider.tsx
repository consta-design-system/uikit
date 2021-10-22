import './Slider.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import { SliderLine } from './SliderLine/SliderLine';
import { defaultPropSize, SliderProps } from './helper';

const cnSlider = cn('Slider');

export function Slider<RANGE extends boolean>(props: SliderProps<RANGE>) {
  const {
    min = 0,
    max = 100,
    onChange,
    value,
    step = 10,
    disabled,
    size = defaultPropSize,
    view = 'default',
    leftSide,
    rightSide,
    range,
    label,
    status,
    caption,
    className,
    ...otherProps
  } = props;

  return (
    <div className={cnSlider(null, [className])} {...otherProps}>
      {label && <FieldLabel size={size}>{label}</FieldLabel>}
      <div className={cnSlider('Container')}>
        <SliderLine min={min} max={max} view={view} range={range} value={value} step={step} />
      </div>
      {caption && <FieldCaption status={status}>{caption}</FieldCaption>}
    </div>
  );
}
