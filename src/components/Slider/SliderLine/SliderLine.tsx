import './SliderLine.css';

import React, { useEffect, useState } from 'react';

import { cn } from '../../../utils/bem';
import { calculateLines, Line, SliderLineProps } from '../helper';

const cnSliderLine = cn('SliderLine');

export const SliderLine = (props: SliderLineProps) => {
  const { min = 0, max = 100, step, view = 'default', value, range, ...otherProps } = props;

  const [lines, setLines] = useState<Line[]>([]);
  const [isLineHovered, setIsLineHovered] = useState<boolean>(false);

  useEffect(() => {
    setLines(calculateLines(value, min, max, view, step));
  }, [value, min, max, view, step]);

  const handleHover = (active: boolean) => {
    if (active) setIsLineHovered(true);
  };

  const handleBlur = (active: boolean) => {
    if (active) setIsLineHovered(false);
  };

  return (
    <div className={cnSliderLine({ view })} {...otherProps}>
      {lines.map((line) => (
        <div
          onMouseEnter={() => handleHover(line.active)}
          onMouseLeave={() => handleBlur(line.active)}
          className={cnSliderLine('Line', {
            active: line.active,
            hovered: line.active && isLineHovered,
          })}
          style={{
            ['--slider-line-size' as string]: `${line.size}%`,
          }}
        />
      ))}
    </div>
  );
};
