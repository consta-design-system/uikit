import React from 'react';
import RCSlider, { SliderProps as RCSliderProps } from 'rc-slider';
import bem from '../../utils/bem';

import './Slider.css';
import 'rc-slider/assets/index.css';

const b = bem('Slider');

export type SliderProps = RCSliderProps;

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return (
    <div className={b({}, className)}>
      <RCSlider {...props} />
    </div>
  );
};

export default Slider;
