import './SliderLine.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { SliderLineProps } from '../helper';

const cnSliderLine = cn('SliderLine');

export const SliderLine = (props: SliderLineProps) => {
  const {
    hovered,
    onHover,
    lines,
    disabled,
    view = 'default',
    ...otherProps
  } = props;

  const handleHover = (active: boolean, hover: boolean) => {
    if (!disabled && active) {
      onHover?.(hover);
    }
  };

  return (
    <div className={cnSliderLine({ view })} {...otherProps}>
      {lines.map((line, index) => (
        <div
          onMouseEnter={() => handleHover(line.active, true)}
          onMouseLeave={() => handleHover(line.active, false)}
          className={cnSliderLine('Line', {
            active: line.active,
            hovered: line.active && hovered,
            disabled,
          })}
          key={cnSliderLine({ index })}
          style={{
            ['--slider-line-size' as string]: `${line.width}%`,
          }}
        />
      ))}
    </div>
  );
};
